import { Flex, Box, VStack, Icon, Text, Avatar } from "@chakra-ui/react";
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdExplore } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../features/auth/authSlice";
import { getSingleUser, getUserPosts } from "../features/users/singleUserSlice";
import { NewPostModal } from "./NewPostModal";
import { getAllBookmarks } from "../features/bookmark/bookmarkSlice";

function Sidebar() {
  const getActiveStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "#08a0e9" : "none",
    color: isActive ? "white" : "none",
  });
  const dispatch = useDispatch();
  const {
    user: { _id, username },
    user,
    token,
  } = useSelector((store) => store.auth);
  return (
    <VStack
      height="50vh"
      spacing={65}
      width={"10rem"}
      position="fixed"
      paddingTop={"5rem"}
      // border={"3px solid green"}
      display={{
        base: "none",
        md: "block",
        lg: "block",
        xl: "block",
        "2xl": "block",
      }}
    >
      <Flex flexDirection={"column"} justifyContent="space-between">
        <Box
          as={NavLink}
          to="/home"
          padding="10px"
          width="10rem"
          borderRadius={4}
          marginBottom={3}
          style={getActiveStyle}
        >
          <Flex alignItems="center" justifyContent={"flex-start"}>
            {" "}
            <Icon marginRight="15px" as={AiFillHome} />{" "}
            <Text as="strong">Home</Text>{" "}
          </Flex>
        </Box>

        <Box
          as={NavLink}
          to="/explore"
          padding="10px"
          width="10rem"
          borderRadius={4}
          marginBottom={3}
          style={getActiveStyle}
        >
          <Flex alignItems="center">
            {" "}
            <Icon marginRight="15px" as={MdExplore} />{" "}
            <Text as="strong">Explore</Text>{" "}
          </Flex>
        </Box>

        <Box
          as={NavLink}
          to="/bookmarks"
          onClick={() => {
            dispatch(getAllBookmarks(token));
          }}
          padding="10px"
          width="10rem"
          borderRadius={4}
          marginBottom={3}
          style={getActiveStyle}
        >
          <Flex alignItems="center">
            {" "}
            <Icon marginRight="15px" as={BsFillBookmarkHeartFill} />{" "}
            <Text as="strong">Bookmarks</Text>{" "}
          </Flex>
        </Box>

        <Box
          as={NavLink}
          to={`/user/${_id}`}
          onClick={() => {
            dispatch(getSingleUser(_id));
            dispatch(getUserPosts(username));
          }}
          padding="10px"
          width="10rem"
          borderRadius={4}
          marginBottom={3}
          style={getActiveStyle}
        >
          <Flex alignItems="center">
            <Icon marginRight="15px" as={CgProfile} />{" "}
            <Text as="strong">Profile</Text>{" "}
          </Flex>
        </Box>
        <NewPostModal />
      </Flex>
      {user?.firstname && (
        <Box
          // padding="10px"
          minWidth="110%"
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
          // border={"3px solid red"}
        >
          <Box
            as={Link}
            to={`/user/${_id}`}
            onClick={() => {
              dispatch(getSingleUser(_id));
              dispatch(getUserPosts(username));
            }}
            display={"flex"}
            alignItems="center"
            // border={"3px solid blue"}
          >
            <Avatar
              marginRight={"2px"}
              name={`${user?.firstname} ${user?.lastname}`}
              size={{ base: "sm", md: "sm", lg: "sm" }}
            />{" "}
            <Text as={"strong"}>
              {user?.firstname} {user?.lastname}
            </Text>
          </Box>
          <Box
            as={Link}
            to="/"
            onClick={() => {
              dispatch(signOut());
            }}
            marginTop={"2px"}
          >
            <Icon color={"red"} as={IoLogOut} />
          </Box>
        </Box>
      )}
    </VStack>
  );
}

export { Sidebar };
