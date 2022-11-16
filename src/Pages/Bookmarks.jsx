import React from "react";
import {
  Box,
  Button,
  Flex,
  useColorModeValue,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
import { Suggestionbar } from "../Components/Suggestionbar";
import { PostCard } from "../Components/PostCard";
import { useSelector } from "react-redux";

function Bookmarks() {
  const btnBg = useColorModeValue("gray.300", "gray.900");
  const { bookmarks } = useSelector((store) => store.bookmark);

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
        <VStack  width={"40rem"} height="80px" spacing={12}>
          <Flex
            justifyContent={"space-between"}
            position={"fixed"}
            bg="whiteAplha.100"
            zIndex={"99"}
            width="20%"
          >
            <Button bg={btnBg}>
              <Icon as={AiOutlineArrowUp} marginRight="2px" />
              Newest
            </Button>
            <Button bg={btnBg}>
              <Icon as={AiOutlineArrowDown} marginRight="2px" />
              Oldest
            </Button>
          </Flex>
          {bookmarks.map((post) => {
            return <PostCard key={post._id} {...post} />;
          })}
        </VStack>
        <Suggestionbar />
      </Flex>
    </Box>
  );
}

export { Bookmarks };
