import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserPostsService } from "../../services/PostServices/getUserPostsService";
import { getSingleUserService, editUserService } from "../../services/UserServices";

const initialState = {
  profile: {
    userProfile: null,
    isLoading: false,
    error: null,
  },
  posts: {
    userPosts: [],
    isLoading: false,
    error: null,
  },
};

const getSingleUser = createAsyncThunk(
  "user/getSingleUser",
  async (_id, { rejectWithValue }) => {
    try {
      const {
        data: { user },
      } = await getSingleUserService(_id);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getUserPosts = createAsyncThunk(
  "user/getUserPosts",
  async (username, { rejectWithValue }) => {
    try {
      const {
        data: { posts },
      } = await getUserPostsService(username);
      return posts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const editUser = createAsyncThunk(
  "user/editUser",
  async ({ userData, token }, { rejectWithValue }) => {
    try {
      const { data } = await editUserService(userData, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const singleUserSlice = createSlice({
  name: "singleUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getSingleUser
      .addCase(getSingleUser.pending, (state) => {
        state.profile.isLoading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.profile.isLoading = false;
        state.profile.userProfile = action.payload;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.profile.isLoading = false;
        state.profile.error = action.payload;
      })
      
      // getUserPosts
      .addCase(getUserPosts.pending, (state) => {
        state.posts.isLoading = true;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.posts.isLoading = false;
        state.posts.userPosts = action.payload;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.posts.isLoading = false;
        state.posts.error = action.payload;
      })

      // editUser
      .addCase(editUser.pending, (state) => {
        state.profile.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.profile.isLoading = false;
        state.profile.userProfile = action.payload.user;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.profile.isLoading = false;
        state.profile.error = action.payload;
      });
  },
});

const singleUserReducer = singleUserSlice.reducer;
export { singleUserReducer, getSingleUser, getUserPosts, editUser };
