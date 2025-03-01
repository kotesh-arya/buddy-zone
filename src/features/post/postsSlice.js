import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createPostService } from "../../services/PostServices/createPostService";
import { deletePostService } from "../../services/PostServices/deletePostService";
import { disLikePostService } from "../../services/PostServices/disLikePostService";
import { editPostService } from "../../services/PostServices/editPostService";
import { getAllPostsService } from "../../services/PostServices/getAllPostsService";
import { likePostService } from "../../services/PostServices/likePostService";

// Initial state
const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

// Thunks
const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const allPosts = await getAllPostsService();
      return allPosts?.data;
    } catch (error) {
      return rejectWithValue(error.message || "Error fetching posts");
    }
  }
);

const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ postData, token }, { rejectWithValue }) => {
    try {
      const { data } = await createPostService(postData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Error creating the post");
    }
  }
);

const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const { data } = await deletePostService(postId);
      return data.posts;
    } catch (error) {
      return rejectWithValue(error.message || "Error deleting the post");
    }
  }
);

const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ postId, postData }, { rejectWithValue }) => {
    try {
      const { data } = await editPostService(postId, postData);
      return data.posts;
    } catch (error) {
      return rejectWithValue(error.message || "Error editing the post");
    }
  }
);



// Slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.posts = payload;
      })
      .addCase(getAllPosts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(createPost.pending, (state) => {
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.posts = [...state.posts, payload];
      })
      .addCase(createPost.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.posts = payload;
      })
      .addCase(deletePost.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(editPost.fulfilled, (state, { payload }) => {
        state.posts = payload;
      })
      .addCase(editPost.rejected, (state, { payload }) => {
        state.error = payload;
      })

  },
});

const postsReducer = postsSlice.reducer;

export {
  postsReducer,
  getAllPosts,
  createPost,
  deletePost,
  editPost,
};
