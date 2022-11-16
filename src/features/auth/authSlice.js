import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { USER_DATA, USER_TOKEN } from "../../constants";
import { loginService } from "../../services/AuthServices/LoginService";
import { signupService } from "../../services/AuthServices/SignupService";
//initial state for the slice

const initialState = {
  token: localStorage.getItem(USER_TOKEN),
  user: JSON.parse(localStorage.getItem(USER_DATA)),
  isLoading: false,
  isLoggedin: false,
};
const signUp = createAsyncThunk(
  "auth/signUp",
  async (user, { rejectWithValue }) => {
    try {
      let { data } = await signupService(user);
      return data;
    } catch (error) {
      rejectWithValue("error occured in signup service", error.response.data);
    }
  }
);
const logIn = createAsyncThunk(
  "auth/logIn",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await loginService(user);
      return data;
    } catch (error) {
      return rejectWithValue(
        "error occured in login service",
        error.response.data.error[0]
      );
    }
  }
);

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
  extraReducers: {
    [signUp.pending]: (state) => {
      state.isloading = true;
      state.isLoggedin = false;
    },
    [signUp.fulfilled]: (state, { payload }) => {
      state.isloading = false;
      state.token = payload.encodedToken;
      state.user = payload.createdUser;
      state.isLoggedin = true;
    },
    [signUp.rejected]: (state) => {
      state.isloading = false;
    },
    [logIn.pending]: (state) => {
      state.isloading = true;
      state.isLoggedin = true;
    },
    [logIn.fulfilled]: (state, { payload }) => {
      state.isloading = false;
      state.token = payload.encodedToken;
      state.user = payload.foundUser;
      state.isLoggedin = true;
    },
    [logIn.rejected]: (state) => {
      state.isloading = false;
      state.isLoggedin = false;
    },
  },
});

const authReducer = authSlice.reducer;
const { signOut } = authSlice.actions;
export { authReducer, signUp, logIn, signOut };
