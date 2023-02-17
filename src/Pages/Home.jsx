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
import { BottomNavigation } from "../Components/BottomNavigation";

function Home() {
  const btnBg = useColorModeValue("gray.300", "gray.900");
  const { posts } = useSelector((store) => store.posts);
  return (
    <Box>
      <Sidebar />
      <Navbar />
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={{
          base: "column",
          md: "column",
          lg: "column",
          xl: "row",
        }}
        alignItems={{
          base: "center",
          md: "flex-end",
          lg: "flex-end",
          xl: "flex-start",
        }}
        justifyContent={{
          base: "center",
          md: "center",
          lg: "center",
          xl: "flex-end",
        }}
        padding={"80px 0px"}
        paddingRight={{ md: "0rem", lg: "1.5rem", xl: "0rem" }}
        
      >
        <VStack
          spacing={12}
          width={{ base: "100%", md: "72%", lg: "80%", xl: "59%" }}
          marginRight={{ base: "0rem", md: "1rem", lg: "1rem" }}

        >
          <Flex
            justifyContent={"space-between"}
            position={"fixed"}
            bg="whiteAplha.100"
            zIndex={"99"}
            width= {{ base: "90%", md: "60%", lg: "40%" }}
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
           >
            {posts.map((post) => {
              return <PostCard key={post._id} {...post} />;
            })}
          </Box>
        </VStack>
        <Suggestionbar />
      </Box>
      <BottomNavigation/>
    </Box>
  );
}

export { Home };
