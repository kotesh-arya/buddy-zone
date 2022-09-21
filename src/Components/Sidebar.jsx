import {
  Flex,
  Box,
  Button,
  VStack,
  Icon,
  Text,
  Avatar,
} from "@chakra-ui/react";
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
function Sidebar() {
  const getActiveStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "#08a0e9" : "none",
    color: isActive ? "white" : "none",
  });
  const dispatch = useDispatch();
  const {
    user: { _id, username },
    user,
  } = useSelector((store) => store.auth);
  console.log(user._id);
  // console.log(signOut);
  return (
    <VStack
      height="50vh"
      spacing={65}
      width={"20rem"}
      position="fixed"
      paddingTop={"5rem"}
    >
      <Flex flexDirection={"column"} justifyContent="space-between">
        <Box
          as={NavLink}
          to="/home"
          padding="10px"
          width="15rem"
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
          width="15rem"
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
          padding="10px"
          width="15rem"
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
          width="15rem"
          borderRadius={4}
          marginBottom={3}
          style={getActiveStyle}
        >
          <Flex alignItems="center">
            <Icon marginRight="15px" as={CgProfile} />{" "}
            <Text as="strong">Profile</Text>{" "}
          </Flex>
        </Box>
        <NewPostModal/>

        {/* <Button
          padding="10px"
          bg={"#08a0e9"}
          width="15rem"
          borderRadius={4}
          marginBottom={3}
        >
          <Flex alignItems="center">
            {" "}
            <Text as="strong" marginRight="30px">
              New Post
            </Text>{" "}
          </Flex>
        </Button> */}
      </Flex>
      {user?.firstname && (
        <Box
          padding="10px"
          width="78%"
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
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
          >
            <Avatar
              marginRight={"10px"}
              name={`${user?.firstname} ${user?.lastname}`}
              src=""
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
          >
            <Icon color={"red"} as={IoLogOut} />
          </Box>{" "}
        </Box>
      )}
    </VStack>
  );
}

export { Sidebar };
