import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Input,
  Button,
  useColorModeValue,
  Flex,
  Skeleton,
  SkeletonText
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
import { toast } from "react-toastify";

function SinglePost() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { user } = useSelector((store) => store.auth);
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const {
    post,
    comments: { postsComments, isLoading: commentsLoading },
    isLoading, // Assuming you have a isLoading state in Redux
  } = useSelector((store) => store.singlePost);
  useEffect(() => {
    dispatch(getSinglePost(postId));
    // dispatch(getSinglePostComments(postId));
  }, [dispatch, postId]);

  const [comment, setComment] = useState({
    username: user.username,
    text: "",
  });
  const postComments = [...(postsComments[postId] || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Navbar />
      <Flex
        width="100%"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent={{ md: "center" }}
        maxW="1200px"
        mx="auto"
      >
        {/* Sidebar */}
        <Box display={{ base: "none", md: "block" }} width={{ md: "20%", lg: "15%" }}>
          <Sidebar />
        </Box>

        {/* Main Content */}
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={{ base: "2", md: "8" }}
          width={{ base: "100%", md: "60%" }}
          mt="7.2rem"
        >
          <VStack spacing={6} width="100%" maxWidth="600px" alignItems="center">
            {/* Post Content */}
            {isLoading ? (
              <Skeleton height="200px" width="100%" borderRadius="md" />
            ) : (
              <PostCard {...post} fromSinglePostPage={true}
              //  postComments={postComments}
              />
            )}

            {/* Comment Section */}
            <Box width="100%" borderRadius="md" bg={bgColor} p={{ base: 4, md: 6 }} boxShadow="sm">
              <form onSubmit={(e) => e.preventDefault()}>
                <Box display="flex" gap={2}>
                  <Input
                    flex="1"
                    value={comment.text}
                    onChange={(e) =>
                      setComment((prev) => ({ ...prev, text: e.target.value }))
                    }
                    placeholder="Type here..."
                  />
                  <Button
                    type="submit"
                    disabled={!comment.text}
                    onClick={async () => {
                      try {
                        await dispatch(addComment({ postId, text: comment.text })).unwrap();
                        setComment((prev) => ({ ...prev, text: "" }));
                        dispatch(getSinglePostComments(postId))
                      } catch (error) {
                        toast.error("Failed to Add comment");
                      }
                    }}
                  >
                    Comment
                  </Button>
                </Box>
              </form>

              {/* Display Comments */}
              <Box mt={4}>
                {commentsLoading
                  ? Array(3) // Show 3 skeleton comments while isLoading
                    .fill("")
                    .map((_, index) => (
                      <Box key={index} mb={4}>
                        <Skeleton height="10px" width="50%" mb={2} />
                        <SkeletonText noOfLines={2} spacing="2" />
                      </Box>
                    ))
                  : postComments?.map((comment) => (
                    <CommentContainer
                      key={comment.id}
                      postId={postId}
                      commentId={comment.id}
                      {...comment}
                    />
                  ))}
              </Box>
            </Box>
          </VStack>
        </Box>

        {/* Suggestionbar for large screens */}
        <Box display={{ base: "none", xl: "block" }} width={{ lg: "25%" }}>
          <Suggestionbar />
        </Box>
      </Flex>

      {/* Bottom Navigation for Mobile */}
      <Box display={{ base: "block", md: "none" }}>
        <BottomNavigation />
      </Box>
    </Box>
  );
}

export { SinglePost };
