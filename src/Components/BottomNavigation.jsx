import React from "react";
import {
  Icon,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { NavLink, Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdExplore } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookmarks } from "../features/bookmark/bookmarkSlice";
import { getSingleUser, getUserPosts } from "../features/users/singleUserSlice";
import { NewPostModal } from "./NewPostModal";
import { logOut } from "../features/auth/authSlice";

function BottomNavigation() {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const getActiveStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "#08a0e9" : "none",
    color: isActive ? "black" : "none",
  });
  const dispatch = useDispatch();
  const {
    user: { id, username },
    token,
  } = useSelector((store) => store.auth);
  return (
    <div>
      <Box
        display={{
          base: "flex",
          md: "none",
          lg: "none",
          xl: "none",
          "2xl": "none",
        }}
        bg={bgColor}
        position="fixed"
        bottom={"0"}
        width={"100%"}
        justifyContent="space-between"
        px={2}
        py={2}
        zIndex={"100"}
        boxShadow="md"
      >
        <Box
          as={NavLink}
          to="/home"
          padding="10px"
          borderRadius={4}
          style={getActiveStyle}
        >
          <Icon as={AiFillHome} />
        </Box>
        <Box
          as={NavLink}
          to="/explore"
          padding="10px"
          borderRadius={4}
          style={getActiveStyle}
        >
          <Icon as={MdExplore} />
        </Box>
        <Box
          as={NavLink}
          to="/bookmarks"
          onClick={() => {
            dispatch(getAllBookmarks(token));
          }}
          padding="10px"
          borderRadius={4}
          style={getActiveStyle}
        >
          <Icon as={BsFillBookmarkHeartFill} />
        </Box>
        <Box
          as={NavLink}
          to={`/user/${id}`}
          onClick={() => {
            dispatch(getSingleUser(id));
            dispatch(getUserPosts(username));
          }}
          padding="10px"
          borderRadius={4}
          style={getActiveStyle}
        >
          <Icon as={CgProfile} />
        </Box>
        <NewPostModal fromBottom={true} />
        <Box
          as={Link}
          to="/"
          onClick={() => {
            dispatch(logOut());
          }}
          padding="10px"
          borderRadius={4}
        >
          <Icon fontSize={"1rem"} color={"red"} as={IoLogOut} />
        </Box>
      </Box>
    </div>
  );
}

export { BottomNavigation };
