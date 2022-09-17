import "./App.css";
import { SignIn } from "../src/Pages/SignIn";
import { SignUp } from "./Pages/SignUp";
import { Routes, Route } from "react-router-dom";
import { Home, Explore, Bookmarks, Profile, SinglePost } from "../src/Pages";
import { getAllUsers } from "../src/features/users/usersSlice";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllPosts } from "./features/post/postsSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllPosts());
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="/posts/:postId" element={<SinglePost />} />
      </Routes>
    </div>
  );
}

export default App;
