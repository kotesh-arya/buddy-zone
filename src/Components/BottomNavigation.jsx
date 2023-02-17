import React from "react";
import {
  Button,
  Flex,
  useColorMode,
  Icon,
  Image,
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
import { signOut } from "../features/auth/authSlice";

function BottomNavigation() {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const getActiveStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "#08a0e9" : "none",
    color: isActive ? "black" : "none",
  });
  const dispatch = useDispatch();
  const {
    user: { _id, username },
    user,
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
        // border={"1px solid red"}
      >
        <Box
          as={NavLink}
          to="/home"
          padding="10px"
          //  width="10rem"  set the width here first
          borderRadius={4}
          // marginBottom={3}
          style={getActiveStyle}
          // border={"1px solid green"}
        >
          <Icon as={AiFillHome} />
        </Box>
        <Box
          as={NavLink}
          to="/explore"
          padding="10px"
          //  width="10rem"  set the width here first
          borderRadius={4}
          // marginBottom={3}
          style={getActiveStyle}
          // border={"1px solid green"}
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
          //  width="10rem"  set the width here first
          borderRadius={4}
          // marginBottom={3}
          style={getActiveStyle}
          // border={"1px solid green"}
        >
          <Icon as={BsFillBookmarkHeartFill} />
        </Box>
        <Box
          as={NavLink}
          to={`/user/${_id}`}
          onClick={() => {
            dispatch(getSingleUser(_id));
            dispatch(getUserPosts(username));
          }}
          padding="10px"
          //  width="10rem"  set the width here first
          borderRadius={4}
          // marginBottom={3}
          style={getActiveStyle}
          // border={"1px solid green"}
        >
          <Icon as={CgProfile} />
        </Box>
        <NewPostModal fromBottom={true} />
        <Box
          as={Link}
          to="/"
          onClick={() => {
            dispatch(signOut());
          }}
          padding="10px"
          borderRadius={4}
          // border={"1px solid green"}
        >
          <Icon fontSize={"1rem"} color={"red"} as={IoLogOut} />
        </Box>
      </Box>
    </div>
  );
}

export { BottomNavigation };
