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
import { BiNews, BiChip } from "react-icons/bi";
import { RiShirtFill } from "react-icons/ri";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
import { Suggestionbar } from "../Components/Suggestionbar";
import { PostCard } from "../Components/PostCard";
import { useSelector } from "react-redux";
import { BottomNavigation } from "../Components/BottomNavigation";

function Explore() {
  const btnBg = useColorModeValue("gray.300", "gray.700");
  const { posts, isLoading } = useSelector((store) => store.posts);

  return (
    <Box>
      <Navbar />

      <Flex width={"95%"}>
        {/* Sidebar for large screens */}
        <Box display={{ base: "none", md: "block" }} width={{ md: "20%", lg: "15%" }}>
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
          {/* Category Filters */}
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
              <Icon as={BiNews} mr={2} />
              News
            </Button>
            <Button bg={btnBg} flex="1" mx={1}>
              <Icon as={BiChip} mr={2} />
              Tech
            </Button>
            <Button bg={btnBg} flex="1" mx={1}>
              <Icon as={RiShirtFill} mr={2} />
              Fashion
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
              {posts?.length > 0 ? (
                posts.map((post) => <PostCard key={post.id} {...post} />)
              ) : (
                <div position="fixed" top="50%">
                  <h2>No posts yet, go ahead and explore topics!</h2>
                </div>
              )}
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

export { Explore };