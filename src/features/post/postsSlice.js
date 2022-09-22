import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createPostService } from "../../services/PostServices/createPostService";
import { deletePostService } from "../../services/PostServices/deletePostService";
import { editPostService } from "../../services/PostServices/editPostService";

import { getAllPostsService } from "../../services/PostServices/getAllPostsService";
//initial state for the slice

const initialState = {
  posts: [],
  isloading: false,
  error: "",
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

const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ postId, token }, { rejectWithValue }) => {
    console.log({ postId, token });
    try {
      const { data } = await deletePostService(postId, token);
      return data.posts;
    } catch (error) {
      rejectWithValue("error occured in delete post service");
    }
  }
);
const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ postId, postData, token }, { rejectWithValue }) => {
    try {
      const { data } = await editPostService(postId, postData, token);
      return data.posts;
    } catch (error) {
      rejectWithValue("error occured in edit post service");
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
      state.posts = payload.posts;

      state.error = " ";
    },
    [createPost.rejected]: (state, { payload }) => {
      state.error = payload;
    },

    [deletePost.fulfilled]: (state, { payload }) => {
      state.posts = payload;
      state.posts = payload;

      state.error = "";
    },
    [deletePost.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    [editPost.fulfilled]: (state, { payload }) => {
      state.posts = payload;

      state.error = "";
    },
    [editPost.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});

const postsReducer = postsSlice.reducer;
export { postsReducer, getAllPosts, createPost, deletePost, editPost };
