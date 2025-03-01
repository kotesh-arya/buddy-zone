import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { bookmarkPostService } from "../../services/BookmarkServices/bookmarkPostService";
import { getAllBookmarkService } from "../../services/BookmarkServices/getAllBookmarkService";
import { removePostFromBookmarkService } from "../../services/BookmarkServices/removeBookmarkService";

const initialState = {
  userBookmarks: [],  // Stores the current user's bookmarks
  allBookmarks: {},   // Stores bookmarks of all users (userId -> bookmarks array)
  isLoading: false,
  error: null,
};


const bookmarkPost = createAsyncThunk(
  "bookmarks/bookmarkPost",
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      const data = await bookmarkPostService(postId, userId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getAllBookmarks = createAsyncThunk(
  "bookmarks/getAllBookmarks",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await getAllBookmarkService(userId); // Fetch all bookmarks from the backend
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


const removePostFromBookmark = createAsyncThunk(
  "bookmarks/removePostFromBookmark",
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      const data = await removePostFromBookmarkService(postId, userId);
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
      .addCase(bookmarkPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bookmarkPost.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userBookmarks = payload.data.userBookmarks; // Update current user bookmarks
        state.allBookmarks = payload.data.allBookmarks;  // Update all users' bookmarks
      })
      .addCase(bookmarkPost.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // Handle getAllBookmarks
      .addCase(getAllBookmarks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBookmarks.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.allBookmarks = payload.allBookmarks; // Store all bookmarks (userId -> bookmarks)
        state.userBookmarks = payload.userBookmarks; // Store only current user's bookmarks
        state.error = null;
      })
      .addCase(getAllBookmarks.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // Handle removePostFromBookmark
      .addCase(removePostFromBookmark.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removePostFromBookmark.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userBookmarks = payload.data.userBookmarks; // Update current user bookmarks
        state.allBookmarks = payload.data.allBookmarks;  // Update all users' bookmarks
      })
      .addCase(removePostFromBookmark.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
  },
});

export const bookmarkReducer = bookmarkSlice.reducer;
export { bookmarkPost, getAllBookmarks, removePostFromBookmark };
