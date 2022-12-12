import React from "react";
import {
  Box,
  Button,
  Flex,
  useColorModeValue,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { AiFillFire } from "react-icons/ai";
import { BiNews, BiChip } from "react-icons/bi";
import { RiShirtFill } from "react-icons/ri";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
import { Suggestionbar } from "../Components/Suggestionbar";
import { PostCard } from "../Components/PostCard";
import { useSelector } from "react-redux";

function Explore() {
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
      >
        <VStack width={"40rem"} height="80px" spacing={12}>
          <Flex
            justifyContent={"space-between"}
            position={"fixed"}
            bg="whiteAplha.100"
            zIndex={"99"}
            width="40%"
          >
            <Button bg={btnBg}>
              <Icon as={AiFillFire} marginRight="2px" />
              Trending
            </Button>
            <Button bg={btnBg}>
              <Icon as={BiNews} marginRight="2px" />
              News
            </Button>
            <Button bg={btnBg}>
              <Icon as={BiChip} marginRight="2px" />
              Tech
            </Button>
            <Button bg={btnBg}>
              <Icon as={RiShirtFill} marginRight="2px" />
              Fashion
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

export { Explore };
