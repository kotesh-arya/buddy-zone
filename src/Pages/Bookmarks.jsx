import React from "react";
import {
  Box,
  Button,
  Flex,
  VStack,
  Icon,
  useColorModeValue,
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
  const bgColor = useColorModeValue("rgba(255, 255, 255, 0.05)", "rgba(0, 0, 0, 0.3)");

  const { bookmarks } = useSelector((store) => store.bookmark);

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh">
      <Navbar />

      <Flex width="100%" flexDirection={{ base: "column", md: "row" }}>
        {/* Sidebar */}
        <Box display={{ base: "none", md: "block" }} width={{ md: "20%", lg: "15%" }}>
          <Sidebar />
        </Box>

        {/* Bookmarks Container */}
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={{ base: "2", md: "8" }}
          marginTop={{ base: "1rem", md: "0rem" }}
          width={{ base: "100%", md: "60%" }}
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
              { label: "Newest", icon: AiOutlineArrowUp },
              { label: "Oldest", icon: AiOutlineArrowDown },
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

          {/* Bookmarks List */}
          <VStack mt="7rem" spacing={6} width="100%" maxW="600px">
            {bookmarks.length > 0 ? (
              bookmarks.map((post) => <PostCard key={post.id} {...post} />)
            ) : (
              <Flex direction="column" alignItems="center" justifyContent="center" minH="50vh" textAlign="center">
                <Image src={EmptyIcon} alt="empty-box" boxSize="50%" mb={4} />
                <Heading fontSize={{ base: "lg", md: "xl" }} textAlign="center">
                  You have not bookmarked any posts yet!
                </Heading>
              </Flex>
            )}
          </VStack>
        </Box>

        {/* Suggestionbar for large screens */}
        <Box display={{ base: "none", xl: "block" }} width={{ lg: "25%" }}>
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

export { Bookmarks };
