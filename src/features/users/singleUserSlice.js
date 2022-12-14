import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserPostsService } from "../../services/PostServices/getUserPostsService";
import {
  getSingleUserService,
  editUserService,
} from "../../services/UserServices";
const initialState = {
  profile: {
    userProfile: null,
    isloading: false,
    error: null,
  },
  posts: {
    userPosts: [],
    isLoading: false,
  },
};
const getSingleUser = createAsyncThunk(
  "user/getSingleUser",
  async (_id, { rejectWithValue }) => {
    try {
      let {
        data: { user },
      } = await getSingleUserService(_id);
      return user;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const getUserPosts = createAsyncThunk(
  "user/getUserPosts",
  async (username, { rejectWithValue }) => {
    try {
      let {
        data: { posts },
      } = await getUserPostsService(username);
      return posts;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const editUser = createAsyncThunk(
  "user/editUser",
  async ({ userData, token }, { rejectWithValue }) => {
    try {
      const { data } = await editUserService(userData, token);
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const singleUserSlice = createSlice({
  name: "singleUser",
  initialState,
  extraReducers: {
    [getSingleUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleUser.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.profile.userProfile = action.payload;
    },
    [getSingleUser.rejected]: (state) => {
      state.isLoading = false;
    },
    [getUserPosts.pending]: (state) => {
      state.posts.isLoading = true;
    },
    [getUserPosts.fulfilled]: (state, action) => {
      state.posts.isLoading = true;
      state.posts.userPosts = action.payload;
    },
    [getUserPosts.rejected]: (state) => {
      state.posts.isLoading = false;
    },

    [editUser.pending]: (state) => {
      state.profile.isloading = true;
    },
    [editUser.fulfilled]: (state, action) => {
      state.profile.isloading = false;
      state.profile.userProfile = action.payload.user;
    },
    [editUser.rejected]: (state, { payload }) => {
      state.profile.isloading = false;
      state.profile.error = payload;
    },
  },
});

const singleUserReducer = singleUserSlice.reducer;
export { singleUserReducer, getSingleUser, getUserPosts, editUser };
