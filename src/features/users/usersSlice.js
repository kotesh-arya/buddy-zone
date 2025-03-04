import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsersService } from "../../services/UserServices/getUsersService";

const initialState = {
  users: [],
  isLoading: false,
  followingUsers: [], // Users the current user is following
  followersUsers: [], // Users following the current user
  error: null,
};

// Fetch all users
const getUsers = createAsyncThunk("users/getUsers", async (_, { rejectWithValue }) => {
  try {
    const { data } = await getUsersService();
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});


const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Users
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.users;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

const usersReducer = usersSlice.reducer;

export { getUsers, usersReducer };
