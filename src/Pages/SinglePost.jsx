import React from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
import { Suggestionbar } from "../Components/Suggestionbar";
import { PostCard } from "../Components/PostCard";
import { useSelector } from "react-redux";
import { CommentContainer } from "../Components/CommentContainer";

function SinglePost() {
  const bgColor = useColorModeValue("gray.50", "gray.900");

  const {
    post,
    comments: { postComments },
  } = useSelector((store) => store.singlePost);
  console.log(postComments);

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
            <Box
              width={"90%"}
              borderRadius={"15px"}
              padding={"2rem 1rem"}
              bg={bgColor}
            >
              <Box display={"flex"}>
                <Input width={"100%"} /> <Button>Comment</Button>
              </Box>
              <Box display={"flex"} padding={"1rem"} flexDirection={"column"}>
                {postComments?.map((comment) => {
                  return <CommentContainer key={comment._id} {...comment} />;
                })}
              </Box>
            </Box>
          </Flex>
        </VStack>
        <Suggestionbar />
      </Flex>
    </Box>
  );
}

export { SinglePost };
