import React from "react";
import {
  Box,
  Button,
  Flex,
  useColorModeValue,
  VStack,
  Icon,
  Heading,
  Image,
} from "@chakra-ui/react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
import { Suggestionbar } from "../Components/Suggestionbar";
import { PostCard } from "../Components/PostCard";
import { useSelector } from "react-redux";
import { BottomNavigation } from "../Components/BottomNavigation";
import EmptyIcon from "../assets/empty-inbox.png";

function Bookmarks() {
  const btnBg = useColorModeValue("gray.300", "gray.700");
  const { bookmarks } = useSelector((store) => store.bookmark);

  return (
    <Box display="flex" flexDirection={{ base: "column", xl: "row" }}>
      <Sidebar />
      <Box flex="1">
        <Navbar />
        <Flex
          direction="column"
          align="center"
          py={8}
          px={{ base: 4, md: 8 }}
          maxW={{ base: "100%", md: "70%", xl: "50%" }}
          mx="auto"
        >
          <Flex
            justify="space-between"
            w="full"
            maxW="md"
            mb={4}
            position="sticky"
            top={16}
            bg={useColorModeValue("white", "gray.800")}
            p={2}
            borderRadius="md"
            boxShadow="sm"
            zIndex={10}
          >
            <Button bg={btnBg} _hover={{ opacity: 0.8 }}>
              <Icon as={AiOutlineArrowUp} mr={2} /> Newest
            </Button>
            <Button bg={btnBg} _hover={{ opacity: 0.8 }}>
              <Icon as={AiOutlineArrowDown} mr={2} /> Oldest
            </Button>
          </Flex>
          <Box w="full">
            {bookmarks.length > 0 ? (
              bookmarks.map((post) => <PostCard key={post.id} {...post} />)
            ) : (
              <Flex
                direction="column"
                align="center"
                justify="center"
                h="60vh"
              >
                <Image src={EmptyIcon} alt="empty-box" boxSize="50%" mb={4} />
                <Heading fontSize={{ base: "lg", md: "xl" }} textAlign="center">
                  You have not bookmarked any posts yet!
                </Heading>
              </Flex>
            )}
          </Box>
        </Flex>
      </Box>
      {/* <Box display={{ base: "none", lg: "block" }} width="20%">
        <Suggestionbar />
      </Box> */}
      <BottomNavigation />
    </Box>
  );
}

export { Bookmarks };
