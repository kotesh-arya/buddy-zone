import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  VStack,
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
import { useDispatch } from "react-redux";
import {
  addComment,
  getSinglePost,
  getSinglePostComments,
} from "../features/post/singlePostSlice";
import { useParams } from "react-router-dom";

function SinglePost() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { user, token } = useSelector((store) => store.auth);
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const {
    post,
    comments: { postComments },
  } = useSelector((store) => store.singlePost);
  useEffect(() => {
    dispatch(getSinglePost(postId));
    dispatch(getSinglePostComments(postId));
  }, []);
  const [comment, setComment] = useState({
    username: user.username,
    text: "",
  });
  return (
    <Box>
      <Sidebar />
      <Navbar />
      <Flex
        width={"90%"}
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
            width="40rem"
          >
            <PostCard {...post} />
            <Box
              width={"90%"}
              borderRadius={"15px"}
              padding={"2rem 1rem"}
              bg={bgColor}
            >
              <form onSubmit={(e) => e.preventDefault()}>
                <Box display={"flex"}>
                  <Input
                    width={"100%"}
                    value={comment.text}
                    onChange={(e) => {
                      setComment((prev) => {
                        return {
                          ...prev,
                          text: e.target.value,
                        };
                      });
                    }}
                    placeholder={"Type here..."}
                  />{" "}
                  <Button
                    type="submit"
                    onClick={() => {
                      dispatch(
                        addComment({
                          postId: postId,
                          commentData: comment,
                          token,
                        })
                      );
                      setComment((prev) => {
                        return {
                          ...prev,
                          text: "",
                        };
                      });
                    }}
                  >
                    Comment
                  </Button>
                </Box>
              </form>

              <Box display={"flex"} padding={"1rem"} flexDirection={"column"}>
                {postComments?.map((comment) => {
                  return (
                    <CommentContainer
                      key={comment._id}
                      postId={postId}
                      commentId={comment._id}
                      {...comment}
                    />
                  );
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
