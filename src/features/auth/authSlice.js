import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../config/firebase";

// Initial state for the slice
const initialState = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
  token: null,
};

// Listen for Firebase authentication state changes
const authListener = (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          firstName: user.displayName?.split(" ")[0] || "",
          lastName: user.displayName?.split(" ")[1] || "",
          username: user.displayName,
        })
      );
    } else {
      dispatch(logOut());
    }
  });
};

// Async thunks
const signUp = createAsyncThunk(
  "auth/signUp",
  async (user, { rejectWithValue }) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      const token = await res.user.getIdToken(); // Fetch Firebase token

      await updateProfile(res.user, {
        displayName: `${user.firstName} ${user.lastName}`,
      });
      return {
        uid: res.user.uid,
        email: res.user.email,
        firstName: res.user.displayName?.split(" ")[0] || "",
        lastName: res.user.displayName?.split(" ")[1] || "",
        username: res.user.displayName,
        token, // Include token in the response
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
      const res = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      const token = await res.user.getIdToken(); // Fetch Firebase token
      return {
        uid: res.user.uid,
        email: res.user.email,
        firstName: res.user.displayName?.split(" ")[0] || "",
        lastName: res.user.displayName?.split(" ")[1] || "",
        username: res.user.displayName,
        token, // Include token in the response
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const logOut = createAsyncThunk(
  "auth/logOut",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return null;
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
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
      });
  },
});

// Export
const authReducer = authSlice.reducer;
const { setUser } = authSlice.actions;
export { authReducer, signUp, logIn, logOut, authListener };
