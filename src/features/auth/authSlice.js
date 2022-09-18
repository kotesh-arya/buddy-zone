import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signupService } from "../../services/AuthServices/SignupService";
//initial state for the slice

const initialState = {
  token: localStorage.getItem("USER_TOKEN"), // getting the user-token, user-data from the localstorage after successfull login
  user: localStorage.getItem("USER_DATA"),
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [signUp.pending]: (state) => {
      state.isloading = true;
    },
    [signUp.fulfilled]: (state, { payload }) => {
      state.isloading = false;
      state.token = payload.encodedToken;
      state.user = payload.user;
      console.log(payload);
    },
    [signUp.rejected]: (state) => {
      state.isloading = false;
    },
  },
});

const authReducer = authSlice.reducer;
export { authReducer, signUp };
