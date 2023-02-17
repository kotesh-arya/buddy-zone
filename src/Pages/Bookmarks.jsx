import React from "react";
import {
  Box,
  Button,
  Flex,
  useColorModeValue,
  VStack,
  Icon,
  Heading,
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
  const btnBg = useColorModeValue("gray.300", "gray.900");
  const { bookmarks } = useSelector((store) => store.bookmark);
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
          width={{ base: "100%", md: "70%", lg: "80%", xl: "59%" }}
          marginRight={{ base: "0rem", md: "1rem", lg: "1rem" }}
        >
          <Flex
            justifyContent={"space-between"}
            position={"fixed"}
            bg="whiteAplha.100"
            zIndex={"99"}
            width={{ base: "90%", md: "60%", lg: "40%" }}
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
          <Box>
            {bookmarks.length > 0 ? (
              bookmarks.map((post) => {
                return <PostCard key={post._id} {...post} />;
              })
            ) : (
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                height={"100%"}
              >
                <img width={"50%"} src={EmptyIcon} alt="empty-box" srcSet="" />
                <Heading fontSize={{ base: "1rem", md: "2rem", lg: "2rem" }}>
                  You have not bookmarked any post yet !
                </Heading>
              </Box>
            )}
          </Box>
        </VStack>
        <Suggestionbar />
      </Box>
      <BottomNavigation />
    </Box>
  );
}

export { Bookmarks };
