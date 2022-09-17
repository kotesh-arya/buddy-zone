import React from "react";
import { Box, Flex, VStack, Text, Input, Button } from "@chakra-ui/react";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
import { Suggestionbar } from "../Components/Suggestionbar";
import { PostCard } from "../Components/PostCard";
import { useSelector } from "react-redux";
function SinglePost() {
  const { post } = useSelector((store) => store.singlePost);
  console.log(post);

  return (
    <Box>
      <Sidebar />
      <Navbar />
      <Flex
        width={"100%"}
        marginRight="auto"
        justifyContent={"center"}
        padding={"80px 20px"}
      >
        <VStack width={"40rem"} height="80px" spacing={12}>
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            position={"fixed"}
            bg="whiteAplha.100"
            zIndex={"99"}
            width="40%"
          >
            <PostCard {...post} />
            <Box width={"90%"}>
              <Box display={"flex"}>
                <Input width={"100%"} /> <Button>Comment</Button>
              </Box>
              <Text as={"strong"}>Comments render here</Text>
            </Box>
          </Flex>
        </VStack>
        <Suggestionbar />
      </Flex>
    </Box>
  );
}

export { SinglePost };
