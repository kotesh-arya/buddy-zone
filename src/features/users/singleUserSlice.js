import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserPostsService } from "../../services/PostServices/getUserPostsService";
import { getSingleUserService } from "../../services/UserServices/getSingleUserService";

const initialState = {
  user: null,
  isLoading: false,
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

const singleUserSlice = createSlice({
  name: "singleUser",
  initialState,
  extraReducers: {
    [getSingleUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleUser.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.user = action.payload;
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
      // console.log(action.payload);
    },
    [getUserPosts.rejected]: (state) => {
      state.posts.isLoading = false;
    },
  },
});

const singleUserReducer = singleUserSlice.reducer;
export { singleUserReducer, getSingleUser, getUserPosts };
