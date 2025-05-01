import "./App.css";
import { SignIn } from "./Pages/SignIn";
import { SignUp } from "./Pages/SignUp";
import { Routes, Route } from "react-router-dom";
import { Home, Explore, Bookmarks, Profile, SinglePost } from "./Pages";
import { RequiresAuth } from "./RequiresAuth";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { getUsers } from "./features/users/usersSlice";
import { useEffect } from "react";
import { getAllPosts } from "./features/post/postsSlice";
import { getAllBookmarks } from "./features/bookmark/bookmarkSlice";
import { getSingleUser } from "./features/users/singleUserSlice";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Navbar } from "./Components/Navbar";

function App() {
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");

  const { user } = useSelector((store) => store.auth);
  const userId = user?.userId;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getUsers());
      dispatch(getAllPosts());
      dispatch(getAllBookmarks(userId));
      dispatch(getSingleUser());
    }
  }, [dispatch, userId]);

  return (
    <>
    {/* <Navbar/> */}
      {/* Blurred Background Image */}
      <Box
        position="fixed"
        top={0}
        left={0}
        w="100vw"
        h="100vh"
        zIndex={-1}
        backgroundImage="url('https://images.unsplash.com/photo-1527018266815-926d51b81f9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        // bg={bgColor}
        backgroundSize="cover"
        backgroundPosition="center"
        filter="blur(90px)"
      />

      {/* Foreground App Content */}
      <Box className="App" minH="100vh" overflow="auto">
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
      </Box>
    </>
  );
}

export default App;
