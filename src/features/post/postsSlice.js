import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getAllPostsService } from "../../services/UserServices/getAllPostsService";
//initial state for the slice

const initialState = {
  posts: [],
  isloading: false,
};
const getAllPosts = createAsyncThunk(
  "users/getAllPosts",
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
  },
});

const postsReducer = postsSlice.reducer;
export { postsReducer, getAllPosts };
