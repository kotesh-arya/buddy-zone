import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addCommentService } from "../../services/CommentServices/addCommentService";
import { deleteCommentService } from "../../services/CommentServices/deleteCommentService";
import { downVoteCommentService } from "../../services/CommentServices/downVoteCommentService";
import { editCommentService } from "../../services/CommentServices/editCommentService";
import { getPostCommentsService } from "../../services/CommentServices/getPostCommentsService";
import { upVoteCommentService } from "../../services/CommentServices/upVoteCommentService";
import { getSinglePostService } from "../../services/PostServices/getSinglePostService";
import { deleteCommentsofPostService } from "../../services/CommentServices/deleteCommentsofPostService";

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
  "singlePost/getSinglePost",
  async (postId, { rejectWithValue }) => {
    try {
      const {
        data
      } = await getSinglePostService(postId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getSinglePostComments = createAsyncThunk(
  "singlePost/getSinglePostComments",
  async (postId, { rejectWithValue }) => {
    try {
      const {
        data
      } = await getPostCommentsService(postId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const addComment = createAsyncThunk(
  "singlePost/addComment",
  async ({ postId, text }, { rejectWithValue }) => {
    try {
      const { data } = await addCommentService(postId, text);
      return data;
    } catch (error) {
      return rejectWithValue("Error occurred while adding the comment");
    }
  }
);

const editComment = createAsyncThunk(
  "singlePost/editComment",
  async ({ text, commentId }, { rejectWithValue }) => {
    try {
      const { data } = await editCommentService(
        text,
        commentId,
      );
      return data;
    } catch (error) {
      return rejectWithValue("Error occurred while editing the comment");
    }
  }
);

const deleteComment = createAsyncThunk(
  "singlePost/deleteComment",
  async ({ commentId }, { rejectWithValue }) => {
    try {
      const { data } = await deleteCommentService(commentId);
      return data;
    } catch (error) {
      return rejectWithValue("Error occurred while deleting the comment");
    }
  }
);
const deleteCommentsOfPost = createAsyncThunk(
  "singlePost/deleteCommentsOfPost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      await deleteCommentsofPostService(postId);
      return [];
    } catch (error) {
      return rejectWithValue(error.message || "Error deleting all the comments of a post");
    }
  }
);


const upVoteComment = createAsyncThunk(
  "singlePost/upVoteComment",
  async ({ commentId, token }, { rejectWithValue }) => {
    try {
      const { data } = await upVoteCommentService(commentId, token);
      return data;
    } catch (error) {
      return rejectWithValue("Error occurred while upvoting the comment");
    }
  }
);

const downVoteComment = createAsyncThunk(
  "singlePost/downVoteComment",
  async ({ postId, commentId, token }, { rejectWithValue }) => {
    try {
      const { data } = await downVoteCommentService(commentId);
      return data;
    } catch (error) {
      return rejectWithValue("Error occurred while downvoting the comment");
    }
  }
);

const singlePostSlice = createSlice({
  name: "singlePost",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getSinglePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
      })
      .addCase(getSinglePost.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getSinglePostComments.pending, (state) => {
        state.comments.isLoading = true;
      })
      .addCase(getSinglePostComments.fulfilled, (state, action) => {
        state.comments.isLoading = false;
        state.comments.postComments = action.payload;
      })
      .addCase(getSinglePostComments.rejected, (state) => {
        state.comments.isLoading = false;
      })

      .addCase(addComment.pending, (state) => {
        state.comments.isLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.isLoading = false;
        state.comments.postComments = action.payload.comments;
      })
      .addCase(addComment.rejected, (state) => {
        state.comments.isLoading = false;
      })

      .addCase(editComment.pending, (state) => {
        state.comments.isLoading = true;
      })
      .addCase(editComment.fulfilled, (state, action) => {
        state.comments.isLoading = false;
        state.comments.postComments = action.payload.comments;
      })
      .addCase(editComment.rejected, (state) => {
        state.comments.isLoading = false;
      })


      .addCase(deleteCommentsOfPost.pending, (state) => {
        state.comments.isLoading = true;
      })
      .addCase(deleteCommentsOfPost.fulfilled, (state, action) => {
        state.comments.isLoading = false;
        state.comments.postComments = action.payload;
      })
      .addCase(deleteCommentsOfPost.rejected, (state) => {
        state.comments.isLoading = false;
      })


      .addCase(deleteComment.pending, (state) => {
        state.comments.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments.isLoading = false;
        state.comments.postComments = action.payload.comments;
      })
      .addCase(deleteComment.rejected, (state) => {
        state.comments.isLoading = false;
      })

      .addCase(upVoteComment.pending, (state) => {
        state.comments.isLoading = true;
      })
      .addCase(upVoteComment.fulfilled, (state, action) => {
        state.comments.isLoading = false;
        state.comments.postComments = action.payload.comments;
      })
      .addCase(upVoteComment.rejected, (state) => {
        state.comments.isLoading = false;
      })

      .addCase(downVoteComment.fulfilled, (state, action) => {
        state.comments.isLoading = false;
        state.comments.postComments = action.payload.comments;
      })
      .addCase(downVoteComment.rejected, (state) => {
        state.comments.isLoading = false;
      });
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
  deleteCommentsOfPost,
  upVoteComment,
  downVoteComment,
};
