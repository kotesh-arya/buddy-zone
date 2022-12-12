import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { bookmarkPostService } from "../../services/BookmarkServices/bookmarkPostService";
import { getAllBookmarkService } from "../../services/BookmarkServices/getAllBookmarkService";
import { removePostFromBookmarkService } from "../../services/BookmarkServices/removeBookmarkService";

const initialState = {
  bookmarks: [],
  isloading: false,
  error: null,
};

const bookmarkPost = createAsyncThunk(
  "bookmarks/bookmarkPost",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const { data } = await bookmarkPostService(postId, token);
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const getAllBookmarks = createAsyncThunk(
  "bookmarks/getAllBookmarks",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await getAllBookmarkService(token);
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);


const removePostFromBookmark = createAsyncThunk(
  "bookmarks/removePostFromBookmark",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const data = await removePostFromBookmarkService(postId, token);
      return data;
    } catch (error) {
      rejectWithValue(error, "error during remove from bookmark");
    }
  }
);

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  extraReducers: {
    [bookmarkPost.fulfilled]: (state, { payload }) => {
      state.isloading = false;
      state.bookmarks = payload.bookmarks;
    },
    [bookmarkPost.rejected]: (state, { payload }) => {
      state.isloading = false;
      state.error = payload;
    },
    [getAllBookmarks.pending]: (state) => {
      state.isloading = true;
    },
    [getAllBookmarks.fulfilled]: (state, { payload }) => {
      state.isloading = false;
      state.bookmarks = payload.bookmarks;
      state.error = " ";
    },
    [getAllBookmarks.rejected]: (state, { payload }) => {
      state.isloading = false;
      state.error = payload;
    },

    [removePostFromBookmark.fulfilled]: (state, { payload }) => {
      state.isloading = false;
      state.bookmarks = payload.data.bookmarks;
    },
    [removePostFromBookmark.rejected]: (state, { payload }) => {
      state.isloading = false;
      state.error = payload;
    },
  },
});

export const bookmarkReducer = bookmarkSlice.reducer;
export { bookmarkPost, getAllBookmarks, removePostFromBookmark };
