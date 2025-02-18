import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { followUserService } from "../../services/UserServices/followUserService";
import { getUsersService } from "../../services/UserServices/getUsersService";
import { unfollowUserService } from "../../services/UserServices/unfollowUserService";

const initialState = {
  users: [],
  isLoading: false,
  followedUsers: [],
  error: null,
};

const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getUsersService();
      return data;
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
      // getUsers
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
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
          (user) => user.id !== payload?.followUser?.id
        );
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const usersReducer = usersSlice.reducer;

export { getUsers, followUser, unfollowUser, usersReducer };
