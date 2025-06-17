import React from "react";
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
import { AiFillFire } from "react-icons/ai";
import { RiMovie2Line } from "react-icons/ri";
import { GrTechnology } from "react-icons/gr";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
import { Suggestionbar } from "../Components/Suggestionbar";
import { PostCard } from "../Components/PostCard";
import { useSelector } from "react-redux";
import { BottomNavigation } from "../Components/BottomNavigation";

function Explore() {
  const bgColor = useColorModeValue("rgba(255, 255, 255, 0.05)", "rgba(0, 0, 0, 0.3)");

  const { posts, isLoading } = useSelector((store) => store.posts);

  return (
    <Box 
    // bg={useColorModeValue("gray.50", "gray.900")} 
    minH="100vh">
      {/* <Navbar /> */}

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
          width={{ base: "100%", md: "60%" }} // Keeps original behavior
        >
          {/* Sorting Buttons */}
          <Flex
            position="fixed"
            top="0"
            // width="50%"
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
              { label: "Technology", icon: GrTechnology },
              { label: "Entertainment", icon: RiMovie2Line },
            ].map(({ label, icon }) => (
              <Button
                key={label}
                flex="1"
                mx={1}
                bg={bgColor}
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
        <Box display={{ base: "none", xl: "block" }} width={{ lg: "25%" }}
        // border={"3px solid green"}
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

export { Explore };
