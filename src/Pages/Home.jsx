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
  const { user } = useSelector((store) => store.auth);

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh">
      <Navbar />

      <Flex width="100%" flexDirection={{ base: "column", md: "row" }}>
        {/* Sidebar */}
        <Box display={{ base: "none", md: "block" }} width={{ md: "20%", lg: "15%" }}>
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
          width={{ base: "100%", md: "60%" }} // Make full width on small screens
        >

          {/* Sorting Buttons */}
          <Flex
            position="fixed"
            top="0"
            width="100%"
            // maxW="600px"
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

            {[
              { label: "Trending", icon: AiFillFire },
              { label: "Newest", icon: AiOutlineArrowUp },
              { label: "Oldest", icon: AiOutlineArrowDown },
            ].map(({ label, icon }) => (
              <Button
                key={label}
                flex="1"
                mx={1}
                bg={btnBg}
                color="white"
                fontWeight="medium"
                _hover={{ bg: "blue.500", transform: "scale(1.05)" }}
                _active={{ bg: "blue.600", transform: "scale(0.98)" }}
                transition="all 0.2s ease-in-out"
              >
                <Icon as={icon} mr={2} />
                {label}
              </Button>
            ))}
          </Flex>

          {/* Loader or Post List */}
          {isLoading ? (
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              minH="50vh"
              textAlign="center"
            >
              <Spinner size="lg" color="blue.400" />
              <Text mt={4} fontSize="lg" fontWeight="semibold" color="white">
                Loading posts...
              </Text>
            </Flex>
          ) : (
            <VStack mt="7rem" spacing={6} width="100%" maxW="600px">
              {posts?.length > 0 ? (
                posts.map((post) => <PostCard key={post.id} {...post} />)
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
        <Box display={{ base: "none", lg: "block" }} width={{ lg: "25%" }}>
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
