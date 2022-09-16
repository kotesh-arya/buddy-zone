import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./features/post/postsSlice";
import { singleUserReducer } from "./features/users/singleUserSlice";
import { usersReducer } from "./features/users/usersSlice";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    singleUser: singleUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
