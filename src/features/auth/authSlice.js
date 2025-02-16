import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  registerUser,
  fetchCurrentUser,
} from "../../services/AuthServices/authService";

// Initial state for the slice
const initialState = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
};

// Async thunks
const signUp = createAsyncThunk(
  "auth/signUp",
  async (user, { rejectWithValue }) => {
    try {
      const res = await registerUser(user);
      return {
        uid: res.userId,
        email: res.email,
        firstName: res.firstName,
        lastName: res.lastName,
        username: `${res.firstName}${res.lastName}`,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const logIn = createAsyncThunk(
  "auth/logIn",
  async (user, { rejectWithValue }) => {
    try {
      const res = await loginUser(user);
      return {
        uid: res.userId,
        email: res.email,
        firstName: res.firstName,
        lastName: res.lastName,
        username: `${res.firstName}${res.lastName}`,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchCurrentUser();
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const logOut = createAsyncThunk(
  "auth/logOut",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUser();
      return {}; // Reset user state properly
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        state.isLoggedIn = true;
      })
      .addCase(signUp.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        state.isLoggedIn = true;
      })
      .addCase(logIn.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
      });
  },
});

// Export
const authReducer = authSlice.reducer;
const { setUser } = authSlice.actions;
export { authReducer, signUp, logIn, logOut, fetchUser, setUser };
