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
import { BottomNavigation } from "../Components/BottomNavigation";
function Explore() {
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
          marginRight={{ base: "0rem", md: "1rem", lg: "6rem" }}
        >
          <Flex
            justifyContent={"space-between"}
            position={"fixed"}
            bg="whiteAplha.100"
            zIndex={"99"}
            width={{ base: "90%", md: "60%", lg: "40%" }}
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
          <Box>
            {posts.map((post) => {
              return <PostCard key={post._id} {...post} />;
            })}
          </Box>
        </VStack>
        <Suggestionbar />
      </Box>
      <BottomNavigation />
    </Box>
  );
}

export { Explore };
