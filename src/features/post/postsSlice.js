import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createPostService } from "../../services/PostServices/createPostService";

import { getAllPostsService } from "../../services/PostServices/getAllPostsService";

//initial state for the slice

const initialState = {
  posts: [],  
  isloading: false,
  error:""
};
const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      let {
        data: { posts },
      } = await getAllPostsService();
      return posts;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ postData, token }, { rejectWithValue }) => {
    try {
      const { data } = await createPostService(postData, token);
      console.log(data);
      return data;
    } catch (error) {
      rejectWithValue("error occured in creating the post");
    }
  }
);
// feature-slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllPosts.pending]: (state) => {
      state.isloading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.isloading = false;
      state.posts = action.payload;
    },
    [getAllPosts.rejected]: (state) => {
      state.isloading = false;
    },
    [createPost.pending]: (state) => {
      state.error = "";
    },
    [createPost.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.posts = payload.posts;

      state.error = " ";
    },
    [createPost.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});

const postsReducer = postsSlice.reducer;
export { postsReducer, getAllPosts, createPost };
