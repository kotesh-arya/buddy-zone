import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addCommentService } from "../../services/CommentServices/addCommentService";
import { deleteCommentService } from "../../services/CommentServices/deleteCommentService";
import { editCommentService } from "../../services/CommentServices/editCommentService";
import { getPostCommentsService } from "../../services/CommentServices/getPostCommentsService";
import { getSinglePostService } from "../../services/PostServices/getSinglePostService";

const initialState = {
  post: null,
  isLoading: false,
  comments: {
    postComments: [],
    isLoading: false,
  },
  error: "",
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
const addComment = createAsyncThunk(
  "post/addComment",
  async ({ postId, commentData, token }, { rejectWithValue }) => {
    try {
      const { data } = await addCommentService(postId, commentData, token);
      return data;
    } catch (error) {
      rejectWithValue("error occured in add comment to post");
    }
  }
);
const editComment = createAsyncThunk(
  "post/editComment",
  async ({ postId, commentId, commentData, token }, { rejectWithValue }) => {
    try {
      const { data } = await editCommentService(
        postId,
        commentId,
        commentData,
        token
      );
      return data;
    } catch (error) {
      rejectWithValue("error occured in add comment to post");
    }
  }
);
const deleteComment = createAsyncThunk(
  "post/deleteComment",
  async ({ postId, commentId, token }, { rejectWithValue }) => {
    // console.log("extra reducer also working")
    try {
      const { data } = await deleteCommentService(postId, commentId, token);
      console.log(data, "at reducer");
      return data;
    } catch (error) {
      rejectWithValue("error occured in add comment to post");
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
    [addComment.pending]: (state) => {
      state.comments.isLoading = true;
    },
    [addComment.fulfilled]: (state, action) => {
      state.comments.isLoading = false;
      state.comments.postComments = action.payload.comments;
    },
    [addComment.rejected]: (state) => {
      state.comments.isLoading = false;
    },
    [editComment.pending]: (state) => {
      state.comments.isLoading = true;
    },
    [editComment.fulfilled]: (state, action) => {
      state.comments.isLoading = false;
      state.comments.postComments = action.payload.comments;
    },
    [editComment.rejected]: (state) => {
      state.comments.isLoading = false;
    },

    [deleteComment.fulfilled]: (state, action) => {
      state.comments.isLoading = false;
      state.comments.postComments = action.payload.comments;
    },
    [deleteComment.rejected]: (state) => {
      state.comments.isLoading = false;
    },
  },
});
const singlePostReducer = singlePostSlice.reducer;
export {
  singlePostReducer,
  getSinglePost,
  getSinglePostComments,
  addComment,
  editComment,
  deleteComment,
};
