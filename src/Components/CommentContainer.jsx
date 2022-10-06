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
  upVoteComment,
} from "../features/post/singlePostSlice";

function CommentContainer({ postId, commentId, username, text, votes }) {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const { user, token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  // console.log(votes);
  return (
    <Box
      bg={bgColor}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
      marginBottom={"15px"}
      // border={"2px solid red"}
    >
      <Box display={"flex"} alignItems={"center"} flexDirection={"row"}>
        <Avatar src="" name={username} marginRight={"15px"} />
      </Box>
      <Box
        display={"flex"}
        //  border={"2px solid red"}
        // bg={"red"}
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
          <Text as={"strong"}>{username}</Text>
          {username === user.username && (
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
                      onClick={() => {
                        dispatch(
                          deleteComment({
                            postId: postId,
                            commentId: commentId,
                            token,
                          })
                        );
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
        <Text>{text}</Text>
        <Box width={"30%"} display={"flex"} justifyContent={"space-between"}>
          <Text>
            <Icon
              onClick={() => {
                dispatch(
                  upVoteComment({
                    postId: postId,
                    commentId: commentId,
                    token,
                  })
                );
              }}
              cursor={"pointer"}
              as={BiUpvote}
            />
            {votes.upvotedBy.length}{" "}
          </Text>
          <Text>
            {" "}
            <Icon
              onClick={() => {
                dispatch(
                  downVoteComment({
                    postId: postId,
                    commentId: commentId,
                    token,
                  })
                );
              }}
              cursor={"pointer"}
              as={BiDownvote}
            />{" "}
            {votes.downvotedBy.length}{" "}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export { CommentContainer };
