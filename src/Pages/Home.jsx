import {
  Box,
  Button,
  Flex,
  VStack,
  Icon,
  useColorModeValue,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from "react-icons/ai";
import { Navbar } from "../Components/Navbar";
import { NavLink } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar";
import { Suggestionbar } from "../Components/Suggestionbar";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "../Components/PostCard";
import { BottomNavigation } from "../Components/BottomNavigation";
import { getAllPosts } from "../features/post/postsSlice";

function Home() {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((store) => store.posts);
  const bgColor = useColorModeValue("rgba(255, 255, 255, 0.05)", "rgba(0, 0, 0, 0.3)");
  const [sortOrder, setSortOrder] = useState("newest"); // Default sorting order

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);


  // Sorting function
  const sortedPosts = [...(posts || [])].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });
  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh">
      <Navbar />

      <Flex
        width="100%"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent={{ md: "center" }}
        maxW="1200px"
        mx="auto"
      >
        {/* Sidebar */}
        <Box display={{ base: "none", md: "block" }} width={{ md: "20%", lg: "15%" }}
        // border={"2px solid red"}
        >
          <Sidebar />
        </Box>

        {/* Posts Container */}
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={{ base: "2", md: "8" }}
          marginTop={{ base: "1rem", md: "0rem" }}
          width={{ base: "100%", md: "60%" }}
        // border={"2px solid red"}

        >
          {/* Sorting Buttons */}
          <Flex
            position="fixed"
            top="0"
            maxW={{ base: "600px", md: "700px" }}
            justifyContent="space-between"
            bg="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(8px)"
            padding="8px"
            borderRadius="12px"
            boxShadow="lg"
            zIndex="100"
            transition="all 0.3s"
            marginTop="5rem"
          >
            <Button
              flex="1"
              mx={1}
              bg={bgColor}
              fontWeight="medium"
              _hover={{ bg: "blue.500", transform: "scale(1.05)" }}
              _active={{ bg: "blue.600", transform: "scale(0.98)" }}
              transition="all 0.2s ease-in-out"
              onClick={() => setSortOrder("newest")}
            >
              <Icon as={AiOutlineArrowUp} mr={2} />
              Newest
            </Button>

            <Button
              flex="1"
              mx={1}
              bg={bgColor}
              fontWeight="medium"
              _hover={{ bg: "blue.500", transform: "scale(1.05)" }}
              _active={{ bg: "blue.600", transform: "scale(0.98)" }}
              transition="all 0.2s ease-in-out"
              onClick={() => setSortOrder("oldest")}
            >
              <Icon as={AiOutlineArrowDown} mr={2} />
              Oldest
            </Button>
          </Flex>

          {/* Skeleton Loader or Post List */}
          {isLoading ? (
            <VStack mt="7rem" spacing={6} width="100%" maxW="600px">
              {Array.from({ length: 3 }).map((_, index) => (
                <Box key={index} p={6} borderWidth="1px" borderRadius="lg" width="100%" boxShadow="md">
                  <Flex align="center" m="1rem">
                    <SkeletonCircle size="10" />
                    <Box ml="4">
                      <Skeleton height="10px" width="120px" />
                      <Skeleton mt="2" height="8px" width="80px" />
                    </Box>
                  </Flex>
                  <Skeleton mt="8" height="12px" width="100%" />
                  <Skeleton mt="4" height="12px" width="90%" />
                  <Skeleton mt="4" height="12px" width="80%" />
                </Box>
              ))}
            </VStack>
          ) : (
            <VStack mt="7.2rem" spacing={6} width="100%" maxW="600px"
            // border="2px solid blue"

            >
              {sortedPosts?.length > 0 ? (
                sortedPosts?.map((post) => (
                  <Flex
                    as={NavLink}
                    to={`/post/${post.id}`}
                    key={post.id}
                    // border="2px solid green"
                    width="100%"
                  // _hover={{ background: "rgba(255, 255, 255, 0.1)", transform: "scale(1.02)" }}
                  // transition="all 0.2s ease-in-out"
                  >
                    <PostCard key={post.id} {...post} />
                  </Flex>
                ))
              ) : (
                <Flex direction="column" alignItems="center" justifyContent="center" minH="50vh" textAlign="center">
                  <Text fontSize="xl" fontWeight="medium" color="gray.400">
                    No posts yet. Start the conversation!
                  </Text>
                </Flex>
              )}
            </VStack>
          )}
        </Box>

        {/* Suggestionbar for large screens */}
        <Box display={{ base: "none", xl: "block" }} width={{ lg: "25%" }}
        // border={"2px solid red"}

        >
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
