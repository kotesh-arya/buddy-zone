import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth/authSlice";
import { bookmarkReducer } from "./features/bookmark/bookmarkSlice";
import { modalReducer } from "./features/modalSlice";
import { postsReducer } from "./features/post/postsSlice";
import { singlePostReducer } from "./features/post/singlePostSlice";
import { singleUserReducer } from "./features/users/singleUserSlice";
import { usersReducer } from "./features/users/usersSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    singleUser: singleUserReducer,
    singlePost: singlePostReducer,
    auth: authReducer,
    modal: modalReducer,
    bookmark: bookmarkReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
