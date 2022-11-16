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
    <Box>
      <Sidebar />
      <Navbar />
      <Flex
        width={"90%"}
        marginRight="auto"
        justifyContent={"center"}
        padding={"80px 20px"}
        // bg={"blue"}
      >
        <VStack
          // bg={"red"}
          height="80px"
          spacing={12}
        >
          <Flex
            justifyContent={"space-between"}
            position={"fixed"}
            bg="whiteAplha.100"
            zIndex={"99"}
            width="40%"
            // bg={"green"}
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
          <Box width={"40rem"}>
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
