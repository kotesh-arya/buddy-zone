import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPostCommentsService } from "../../services/PostServices/getPostCommentsService";
import { getSinglePostService } from "../../services/PostServices/getSinglePostService";
const initialState = {
  post: null,
  isLoading: false,
  comments: {
    postComments: [],
    isLoading: false,
  },
};

const getSinglePost = createAsyncThunk(
  "post/getSinglePost",
  async (postId, { rejectWithValue }) => {
    try {
      let {
        data: { post },
      } = await getSinglePostService(postId);
      // console.log(post)
      return post;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const getSinglePostComments = createAsyncThunk(
  "post/getSinglePostComments",
  async (postId, { rejectWithValue }) => {
    try {
      let {
        data: { comments },
      } = await getPostCommentsService(postId);
      // console.log(post)
      return comments;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const singlePostSlice = createSlice({
  name: "singlePost",
  initialState,
  extraReducers: {
    [getSinglePost.pending]: (state) => {
      state.isLoading = true;
    },
    [getSinglePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    },
    [getSinglePost.rejected]: (state) => {
      state.isLoading = false;
    },

    [getSinglePostComments.pending]: (state) => {
      state.comments.isLoading = true;
    },
    [getSinglePostComments.fulfilled]: (state, action) => {
      state.comments.isLoading = false;
      state.comments.postComments = action.payload;
    },
    [getSinglePostComments.rejected]: (state) => {
      state.comments.isLoading = false;
    },
  },
});
const singlePostReducer = singlePostSlice.reducer;
export { singlePostReducer, getSinglePost, getSinglePostComments };
