import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { followUserService } from "../../services/UserServices/followUserService";
import { getAllUsersService } from "../../services/UserServices/getAllUsersService";
import { unfollowUserService } from "../../services/UserServices/unfollowUserService";

const initialState = {
  users: [],
  isloading: false,
  followedUsers: [],
};
const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      let {
        data: { users },
      } = await getAllUsersService();
      return users;
    } catch (error) {
      rejectWithValue(error);
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
      rejectWithValue(error);
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
      rejectWithValue(error);
    }
  }
);
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.isloading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.isloading = false;
      state.users = action.payload;
    },
    [getAllUsers.rejected]: (state) => {
      state.isloading = false;
    },
    [followUser.fulfilled]: (state, { payload }) => {
      state.followedUsers.push(payload?.followUser);
    },
    [followUser.rejected]: (state, { payload }) => {
      state.isloading = false;
      state.error = payload;
    },
    [unfollowUser.fulfilled]: (state, { payload }) => {
      state.isloading = false;
      state.followedUsers = state.followedUsers.filter(
        (user) => user._id !== payload?.followUser?._id
      );
    },
    [unfollowUser.rejected]: (state, { payload }) => {
      state.isloading = false;
      state.error = payload;
    },
  },
});

const usersReducer = usersSlice.reducer;

export { getAllUsers, followUser, unfollowUser, usersReducer };
