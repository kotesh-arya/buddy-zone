import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserPostsService } from "../../services/PostServices/getUserPostsService";
import {
  getSingleUserService,
  editUserService,
  followUserService,
  unfollowUserService,
} from "../../services/UserServices";


const initialState = {
  profile: {
    userProfile: null,
    isLoading: false,
    error: null,
    followers: [],  
    following: [],  
  },
  posts: {
    userPosts: [],
    isLoading: false,
    error: null,
  },
};


const getSingleUser = createAsyncThunk(
  "user/getSingleUser",
  async (id, { rejectWithValue }) => {
    try {
      const {
        data
      } = await getSingleUserService();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getUserPosts = createAsyncThunk(
  "user/getUserPosts",
  async (userId, { rejectWithValue }) => {
    try {
      const {
        data: { posts }
      } = await getUserPostsService(userId);
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


const followUser = createAsyncThunk(
  "users/followUser",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const { data } = await followUserService(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const unfollowUser = createAsyncThunk(
  "users/unfollowUser",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const { data } = await unfollowUserService(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
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
        state.profile.followers = action.payload.followers;
        state.profile.following = action.payload.following;
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
      })

      // follow user
      .addCase(followUser.pending, (state) => {
        state.profile.isLoading = true;
      })
      .addCase(followUser.fulfilled, (state, { payload }) => {
        state.profile.isLoading = false;
        state.profile.error = null;

        if (state.profile.userProfile) {
          // If the logged-in user is viewing their own profile, update `following`
          if (state.profile.userProfile._id === payload.updatedFollowingUserId) {
            state.profile.following = payload.updatedFollowing || [];
          }
          // If the profile belongs to the user being followed, update `followers`
          if (state.profile.userProfile._id === payload.updatedFollowedUserId) {
            state.profile.followers = payload.updatedFollowers || [];
          }
        }
      })
      .addCase(followUser.rejected, (state, action) => {
        state.profile.isLoading = false;
        state.profile.error = action.payload;
      })

      // unfollow user
      .addCase(unfollowUser.pending, (state) => {
        state.profile.isLoading = true;
      })
      .addCase(unfollowUser.fulfilled, (state, { payload }) => {
        state.profile.isLoading = false;
        state.profile.error = null;

        if (state.profile.userProfile) {
          // If the logged-in user is viewing their own profile, update `following`
          if (state.profile.userProfile._id === payload.updatedFollowingUserId) {
            state.profile.following = payload.updatedFollowing || [];
          }
          // If the profile belongs to the user being unfollowed, update `followers`
          if (state.profile.userProfile._id === payload.updatedUnfollowedUserId) {
            state.profile.followers = payload.updatedFollowers || [];
          }
        }
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.profile.isLoading = false;
        state.profile.error = action.payload;
      });

  },
});

const singleUserReducer = singleUserSlice.reducer;
export { singleUserReducer, getSingleUser, getUserPosts, editUser, followUser, unfollowUser };
