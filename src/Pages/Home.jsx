import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
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
import { PostCard } from "../Components/PostCard";
import { Suggestionbar } from "../Components/Suggestionbar";
function Home() {
  const btnBg = useColorModeValue("gray.300", "gray.900");

  return (
    <div>
      <Sidebar />
      <Navbar />
      <Flex
        width={"90%"}
        marginRight="auto"
        //  bg={"red"}
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
              {" "}
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
          <PostCard />
          <PostCard />
        </VStack>
        <Suggestionbar />
      </Flex>
    </div>
  );
}

export { Home };
