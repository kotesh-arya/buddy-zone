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
      return rejectWithValue(error);
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
      return rejectWithValue(error);
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
      return rejectWithValue(error, "error during remove from bookmark");
    }
  }
);

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  extraReducers: (builder) => {
    builder
      // Handle bookmarkPost
      .addCase(bookmarkPost.fulfilled, (state, { payload }) => {
        state.isloading = false;
        state.bookmarks = payload.bookmarks;
      })
      .addCase(bookmarkPost.rejected, (state, { payload }) => {
        state.isloading = false;
        state.error = payload;
      })

      // Handle getAllBookmarks
      .addCase(getAllBookmarks.pending, (state) => {
        state.isloading = true;
      })
      .addCase(getAllBookmarks.fulfilled, (state, { payload }) => {
        state.isloading = false;
        state.bookmarks = payload.bookmarks;
        state.error = null;
      })
      .addCase(getAllBookmarks.rejected, (state, { payload }) => {
        state.isloading = false;
        state.error = payload;
      })

      // Handle removePostFromBookmark
      .addCase(removePostFromBookmark.fulfilled, (state, { payload }) => {
        state.isloading = false;
        state.bookmarks = payload.data.bookmarks;
      })
      .addCase(removePostFromBookmark.rejected, (state, { payload }) => {
        state.isloading = false;
        state.error = payload;
      });
  },
});

export const bookmarkReducer = bookmarkSlice.reducer;
export { bookmarkPost, getAllBookmarks, removePostFromBookmark };
