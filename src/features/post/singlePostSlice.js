import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSinglePostService } from "../../services/PostServices/getSinglePostService";

const initialState = {
  post: null,
  isLoading: false,
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
  },
});
const singlePostReducer = singlePostSlice.reducer;
export { singlePostReducer, getSinglePost };
