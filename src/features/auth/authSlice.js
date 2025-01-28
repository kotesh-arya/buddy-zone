import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { USER_DATA, USER_TOKEN } from "../../constants";
import {
  loginUser,
  registerUser,
} from "../../services/AuthServices/authService";

// Initial state for the slice
const initialState = {
  token: localStorage.getItem(USER_TOKEN),
  user: JSON.parse(localStorage.getItem(USER_DATA)),
  isLoading: false,
  isLoggedin: false,
};

// Async thunks
const signUp = createAsyncThunk(
  "auth/signUp",
  async (user, { rejectWithValue }) => {
    console.log("USER ->>>>>>", user);
    try {
      let data = await registerUser(user);
      console.log("data here ->>>>>>>>>", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const logIn = createAsyncThunk(
  "auth/logIn",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await loginUser(user);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error[0] || "An error occurred");
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      localStorage.removeItem(USER_DATA);
      localStorage.removeItem(USER_TOKEN);
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.isLoggedin = false;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log("check**************** state now here", state);
        state.token = payload.encodedToken;
        state.user = payload.createdUser;
        state.isLoggedin = true;
      })
      .addCase(signUp.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
        state.isLoggedin = true;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.token = payload.encodedToken;
        state.user = payload.foundUser;
        state.isLoggedin = true;
      })
      .addCase(logIn.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedin = false;
      });
  },
});

// Export
const authReducer = authSlice.reducer;
const { signOut } = authSlice.actions;
export { authReducer, signUp, logIn, signOut };
