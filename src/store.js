import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./features/post/postsSlice";
import { usersReducer } from "./features/users/usersSlice";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
