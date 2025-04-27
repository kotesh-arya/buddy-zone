import "./App.css";
import { SignIn } from "../src/Pages/SignIn";
import { SignUp } from "./Pages/SignUp";
import { Routes, Route } from "react-router-dom";
import { Home, Explore, Bookmarks, Profile, SinglePost } from "../src/Pages";
import { RequiresAuth } from "./RequiresAuth";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

// import { getAllUsers } from "../src/features/users/usersSlice";
import { useDispatch } from "react-redux";
import { getUsers } from "./features/users/usersSlice";
import { useEffect } from "react";
import { getAllPosts } from "./features/post/postsSlice";
import { getAllBookmarks } from "./features/bookmark/bookmarkSlice";
import { getSingleUser } from "./features/users/singleUserSlice";
function App() {
  const { user } = useSelector((store) => store.auth);

  const userId = user?.userId; // Ensure we handle cases where userId is undefined

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      // Only fetch data if the user is logged in
      dispatch(getUsers());
      dispatch(getAllPosts());
      dispatch(getAllBookmarks(userId));
      dispatch(getSingleUser());
    }
  }, [dispatch, userId]); // Effect runs only when userId is defined or changes

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={
            <RequiresAuth>
              <Home />
            </RequiresAuth>
          }
        />
        <Route
          path="/explore"
          element={
            <RequiresAuth>
              <Explore />
            </RequiresAuth>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <RequiresAuth>
              <Bookmarks />
            </RequiresAuth>
          }
        />
        <Route
          path="/user/:userId"
          element={
            <RequiresAuth>
              <Profile />
            </RequiresAuth>
          }
        />
        <Route
          path="/post/:postId"
          element={
            <RequiresAuth>
              <SinglePost />
            </RequiresAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
