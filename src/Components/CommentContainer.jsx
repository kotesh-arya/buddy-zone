import React from "react";
import {
  Avatar,
  Box,
  Button,
  Text,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Icon,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { FiMoreVertical } from "react-icons/fi";
import { EditCommentModal } from "./EditCommentModal";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import {
  deleteComment,
  downVoteComment,
  getSinglePostComments,
  upVoteComment,
} from "../features/post/singlePostSlice";
import { toast } from "react-toastify";

function CommentContainer({ postId, commentId, username, text, votes, firstName, lastName }) {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  return (
    <Box
      // bg={bgColor}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
      marginBottom={"15px"}
      
      bg="whiteAlpha.50"
      backdropFilter="blur(20px)"
      borderRadius="2xl"
      boxShadow="lg"
      border={"1px solid gray"}

    >
      <Box display={"flex"} alignItems={"center"} flexDirection={"row"}>
        <Avatar src="" name={username} marginRight={"15px"} />
      </Box>
      <Box
        display={"flex"}
        width={"100%"}
        flexDirection={"column"}
        alignItems={"flex-start"}
      >
        {" "}
        <Box
          display={"flex"}
          padding={"0px"}
          width={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Text as={"strong"}>{`${firstName} ${lastName}`}</Text>
          {username === user.email && (
            <Box height={"10px"}>
              <Popover>
                <PopoverTrigger>
                  <Button bg={"transparent"}>
                    <Icon as={FiMoreVertical} cursor={"pointer"} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent width={"13rem"}>
                  <PopoverArrow />

                  <PopoverBody>
                    <EditCommentModal
                      postId={postId}
                      commentId={commentId}
                      text={text}
                    />
                    <Button
                      bg={"#08a0e9"}
                      marginLeft={"10px"}
                      onClick={async () => {
                        try {
                          await dispatch(
                            deleteComment({
                              commentId: commentId,
                            })
                          ).unwrap();
                          dispatch(getSinglePostComments(postId))
                        } catch (error) {
                          toast.error("Failed to Delete comment");
                        }
                      }}
                      cursor={"pointer"}
                    >
                      delete
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
          )}
        </Box>
        <Text 
        // border="2px solid red" 
        textAlign="start" width="90%">{text}</Text>
        <Box width={"30%"} display={"flex"} justifyContent={"space-between"}>
          <Text>
            <Icon
              onClick={async () => {
                try {
                  await dispatch(
                    upVoteComment({
                      commentId: commentId,
                    })
                  ).unwrap();
                  dispatch(getSinglePostComments(postId));
                } catch (error) {
                  toast.error("Failed to upvote comment");
                }
              }}
              cursor={"pointer"}
              as={BiUpvote}
            />
            {votes.upvotedBy?.length}{" "}
          </Text>
          <Text>
            {" "}
            <Icon
              onClick={async () => {
                try {
                  await dispatch(
                    downVoteComment({
                      commentId: commentId,
                    })
                  ).unwrap();
                  dispatch(getSinglePostComments(postId));
                } catch (error) {
                  toast.error("Failed to upvote comment");

                }

              }}
              cursor={"pointer"}
              as={BiDownvote}
            />{" "}
            {votes.downvotedBy?.length}{" "}

          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export { CommentContainer };
