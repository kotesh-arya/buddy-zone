import {
  Box,
  Button,
  Flex,
  useColorModeValue,
  VStack,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import {
  AiFillFire,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from "react-icons/ai";

import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
import { Suggestionbar } from "../Components/Suggestionbar";
import { useSelector } from "react-redux";
import { PostCard } from "../Components/PostCard";

function Home() {
  const btnBg = useColorModeValue("gray.300", "gray.900");
  const { posts } = useSelector((store) => store.posts);
  return (
    <Box 
    // border={"3px solid red"}
    >
      <Sidebar />
      <Navbar />
      <Flex
        // border={"3px solid yellow"}
        width={"100%"}
        marginRight="auto"
        justifyContent={"center"}
        padding={"80px 20px"}
      >
        <VStack
        //  height="80px"
        //  border={"3px solid red"}
          spacing={12}>
          <Flex
            justifyContent={"space-between"}
            position={"fixed"}
            bg="whiteAplha.100"
            zIndex={"99"}
            width="40%"
            // border={"3px solid blue"}
          >
            <Button bg={btnBg}>
              <Icon as={AiFillFire} marginRight="2px" />
              Trending
            </Button>
            <Button bg={btnBg}>
              <Icon as={AiOutlineArrowUp} marginRight="2px" />
              Newest
            </Button>
            <Button bg={btnBg}>
              <Icon as={AiOutlineArrowDown} marginRight="2px" />
              Oldest
            </Button>
          </Flex>
          <Box
          //  border={"3px solid pink"}
          //  width={"40rem"}
           >
            {posts.map((post) => {
              return <PostCard key={post._id} {...post} />;
            })}
          </Box>
        </VStack>
        <Suggestionbar />
      </Flex>
    </Box>
  );
}

export { Home };
