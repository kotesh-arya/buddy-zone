import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth/authSlice";
import { bookmarkReducer } from "./features/bookmark/bookmarkSlice";
import { modalReducer } from "./features/modalSlice";
import { postsReducer } from "./features/post/postsSlice";
import { singlePostReducer } from "./features/post/singlePostSlice";
import { singleUserReducer } from "./features/users/singleUserSlice";
import { usersReducer } from "./features/users/usersSlice";
import storage from "redux-persist/lib/storage"; // Use localStorage as default storage
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "isLoggedIn"], // Only persist these fields from auth state
};

const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
  singleUser: singleUserReducer,
  singlePost: singlePostReducer,
  auth: persistReducer(persistConfig, authReducer), // Persist auth state
  modal: modalReducer,
  bookmark: bookmarkReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

export const persistor = persistStore(store);
