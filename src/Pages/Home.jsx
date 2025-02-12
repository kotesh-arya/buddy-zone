import {
  Box,
  Button,
  Flex,
  VStack,
  Icon,
  useColorModeValue,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  AiFillFire,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from "react-icons/ai";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
import { Suggestionbar } from "../Components/Suggestionbar";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "../Components/PostCard";
import { BottomNavigation } from "../Components/BottomNavigation";
import { getAllPosts } from "../features/post/postsSlice";

function Home() {
  const dispatch = useDispatch();
  const btnBg = useColorModeValue("gray.300", "gray.700");
  const { posts, isLoading } = useSelector((store) => store.posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <Box>
      <Navbar />

      <Flex width={"95%"}>
        {/* Sidebar for large screens */}
        <Box
          display={{ base: "none", md: "block" }}
          width={{ md: "20%", lg: "15%" }}
        >
          <Sidebar />
        </Box>

        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={{ base: "4", md: "8" }}
          marginTop={"3.5rem"}
        >
          {/* Sorting Buttons */}
          <Flex
            position="fixed"
            width="100%"
            maxW="600px"
            justifyContent="space-between"
            bg="whiteAlpha.500"
            p={2}
            borderRadius="md"
            boxShadow="sm"
            mb={4}
            zIndex="100"
          >
            <Button bg={btnBg} flex="1" mx={1}>
              <Icon as={AiFillFire} mr={2} />
              Trending
            </Button>
            <Button bg={btnBg} flex="1" mx={1}>
              <Icon as={AiOutlineArrowUp} mr={2} />
              Newest
            </Button>
            <Button bg={btnBg} flex="1" mx={1}>
              <Icon as={AiOutlineArrowDown} mr={2} />
              Oldest
            </Button>
          </Flex>

          {/* Loader or Post List */}
          {isLoading ? (
            <Flex
              flexDirection="column"
              position="fixed"
              top="50%"
              alignItems="center"
              mt="10"
            >
              <Spinner size="md" color="blue.500" />
              <Text mt={4} fontSize="lg">
                Loading posts...
              </Text>
            </Flex>
          ) : (
            <VStack mt={"4rem"} spacing={6} width="100%" maxW="600px">
              {posts?.length > 0 &&
                posts?.map((post) => <PostCard key={post.id} {...post} />)}
            </VStack>
          )}
        </Box>

        {/* Suggestionbar for large screens */}
        <Box display={{ base: "none", lg: "block" }} width="20%">
          <Suggestionbar />
        </Box>
      </Flex>

      {/* Bottom Navigation for mobile */}
      <Box display={{ base: "block", md: "none" }}>
        <BottomNavigation />
      </Box>
    </Box>
  );
}

export { Home };
