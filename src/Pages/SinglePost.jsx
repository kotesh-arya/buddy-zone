import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
import { Suggestionbar } from "../Components/Suggestionbar";
import { PostCard } from "../Components/PostCard";
import { useSelector, useDispatch } from "react-redux";
import { CommentContainer } from "../Components/CommentContainer";
import {
  addComment,
  getSinglePost,
  getSinglePostComments,
} from "../features/post/singlePostSlice";
import { useParams } from "react-router-dom";
import { BottomNavigation } from "../Components/BottomNavigation";

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
          width={{ base: "100%", md: "75%", lg: "80%", xl: "59%" }}
          marginRight={{ base: "0rem", md: "1rem", lg: "1rem" }}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          marginBottom={"2rem"}
        >
          <PostCard {...post} />
          <Box
            width={{ base: "100%", md: "80%", lg: "70%" }}
            borderRadius={"15px"}
            padding={{
              base: "1.5rem 2px",
              md: "1.5rem 10px",
              lg: "1.5rem 1rem",
            }}
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
        </VStack>
        <Suggestionbar />
      </Box>
      <BottomNavigation />
    </Box>
  );
}

export { SinglePost };
