import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { USER_DATA, USER_TOKEN } from "../../constants";
import { loginService } from "../../services/AuthServices/LoginService";
import { signupService } from "../../services/AuthServices/SignupService";
//initial state for the slice

const initialState = {
  token: "", // getting the user-token, user-data from the localstorage after successfull login
  user: "",
  isLoading: false,
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
      state.token = null;
      state.user = null;
      localStorage.removeItem(USER_DATA);
      localStorage.removeItem(USER_TOKEN);
    },
  },
  extraReducers: {
    [signUp.pending]: (state) => {
      state.isloading = true;
    },
    [signUp.fulfilled]: (state, { payload }) => {
      state.isloading = false;
      state.token = payload.encodedToken;
      state.user = payload.createdUser;
      console.log(payload);
    },
    [signUp.rejected]: (state) => {
      state.isloading = false;
    },
    [logIn.pending]: (state) => {
      state.isloading = true;
    },
    [logIn.fulfilled]: (state, { payload }) => {
      state.isloading = false;
      state.token = payload.encodedToken;
      state.user = payload.foundUser;
      console.log(payload);
    },
    [logIn.rejected]: (state) => {
      state.isloading = false;
    },
  },
});

const authReducer = authSlice.reducer;
const signOut = authSlice.actions;
export { authReducer, signUp, logIn, signOut };
