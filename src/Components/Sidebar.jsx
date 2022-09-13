import {
  Flex,
  Box,
  Button,
  VStack,
  Icon,
  Text,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdExplore } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
function Sidebar() {
  return (
    <VStack
      // bg={"red"}
      height="50vh"
      spacing={65}
      width={"20rem"}
      position="fixed"
      paddingTop={"5rem"}
    >
      <Flex flexDirection={"column"} justifyContent="space-between">
        <Link to="/">
          <Box
            padding="10px"
            bg={"#08a0e9"}
            width="15rem"
            borderRadius={4}
            marginBottom={3}
          >
            <Flex alignItems="center" justifyContent={"flex-start"}>
              {" "}
              <Icon marginRight="15px" as={AiFillHome} />{" "}
              <Text as="strong">Home</Text>{" "}
            </Flex>
          </Box>
        </Link>
        <Link to="/explore">
          <Box
            padding="10px"
            bg={"#08a0e9"}
            width="15rem"
            borderRadius={4}
            marginBottom={3}
            // padding={2}
          >
            <Flex alignItems="center">
              {" "}
              <Icon marginRight="15px" as={MdExplore} />{" "}
              <Text as="strong">Explore</Text>{" "}
            </Flex>
          </Box>
        </Link>
        <Link to="/bookmarks">
          <Box
            padding="10px"
            bg={"#08a0e9"}
            width="15rem"
            borderRadius={4}
            marginBottom={3}
            // padding={2}
          >
            <Flex alignItems="center">
              {" "}
              <Icon marginRight="15px" as={BsFillBookmarkHeartFill} />{" "}
              <Text as="strong">Bookmarks</Text>{" "}
            </Flex>
          </Box>
        </Link>
        <Link to="/profile">
          <Box
            padding="10px"
            bg={"#08a0e9"}
            width="15rem"
            borderRadius={4}
            marginBottom={3}
            // padding={2}
          >
            <Flex alignItems="center">
              {" "}
              <Icon marginRight="15px" as={CgProfile} />{" "}
              <Text as="strong">Profile</Text>{" "}
            </Flex>
          </Box>
        </Link>
        <Button
          padding="10px"
          bg={"#08a0e9"}
          width="15rem"
          borderRadius={4}
          marginBottom={3}
          // padding={2}
        >
          <Flex alignItems="center">
            {" "}
            <Icon marginRight="15px" as={FaPen} />{" "}
            <Text as="strong" marginRight="30px">
              New Post
            </Text>{" "}
          </Flex>
        </Button>
      </Flex>
      <Box
        padding="10px"
        width="78%"
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Box display={"flex"} alignItems="center">
          {" "}
          <Avatar
            marginRight={"10px"}
            name="Dan Abrahmov"
            src="https://avatars.githubusercontent.com/u/69259490?v=4"
          />{" "}
          <Text as={"strong"}>Kotesh Mudila</Text>
        </Box>
        <Icon as={IoLogOut} />{" "}
      </Box>
    </VStack>
  );
}

export { Sidebar };
