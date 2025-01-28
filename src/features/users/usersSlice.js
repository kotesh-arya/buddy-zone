import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { followUserService } from "../../services/UserServices/followUserService";
import { getAllUsersService } from "../../services/UserServices/getAllUsersService";
import { unfollowUserService } from "../../services/UserServices/unfollowUserService";

const initialState = {
  users: [],
  isLoading: false,
  followedUsers: [],
  error: null,
};

const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { users },
      } = await getAllUsersService();
      return users;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const followUser = createAsyncThunk(
  "users/followUser",
  async ({ followUserId, token }, { rejectWithValue }) => {
    try {
      const { data } = await followUserService(followUserId, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const unfollowUser = createAsyncThunk(
  "users/unfollowUser",
  async ({ followUserId, token }, { rejectWithValue }) => {
    try {
      const { data } = await unfollowUserService(followUserId, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllUsers
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // followUser
      .addCase(followUser.fulfilled, (state, { payload }) => {
        state.followedUsers.push(payload?.followUser);
      })
      .addCase(followUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // unfollowUser
      .addCase(unfollowUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.followedUsers = state.followedUsers.filter(
          (user) => user._id !== payload?.followUser?._id
        );
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const usersReducer = usersSlice.reducer;

export { getAllUsers, followUser, unfollowUser, usersReducer };
