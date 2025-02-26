import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Icon,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import {
  FaRegBookmark,
  FaRegHeart,
  FaRegCommentAlt,
  FaHeart,
  FaBookmark,
} from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCommentsOfPost,
} from "../features/post/singlePostSlice";
import Moment from "react-moment";
import { Link, useNavigate } from "react-router-dom";
import {
  deletePost,
  disLikePost,
  getAllPosts,
  likePost,
} from "../features/post/postsSlice";
import { EditPostModal } from "./EditPostModal";
import {
  bookmarkPost,
  removePostFromBookmark,
} from "../features/bookmark/bookmarkSlice";
import { toast } from "react-toastify";

function PostCard({
  id,
  updatedAt,
  username,
  content,
  userImage,
  firstName,
  lastName,
  likes,
  fromSinglePostPage
}) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { token, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { bookmarks } = useSelector((store) => store.bookmark);

  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const navigate = useNavigate();
  return (
    <Box
      bg={cardBg}
      boxShadow="lg"
      borderRadius="12px"
      padding="2rem"
      marginY="1rem"
      width="100%"
      maxW="600px"
    // transition="all 0.3s"
    // _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
    // border="2px solid red"
    >
      {/* Header Section */}
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Avatar name={`${firstName} ${lastName}`} src={userImage} size="md" />
          <Box ml="3">
            <Text fontWeight="bold" fontSize="lg">
              {firstName} {lastName}
            </Text>
            <Text fontSize="sm" color="gray.500">
              <Moment fromNow>{updatedAt}</Moment>
            </Text>
          </Box>
        </Flex>

        {(username === user.email && fromSinglePostPage) && (
          <Popover>
            <PopoverTrigger>
              <Button
                size="sm"
                bg="transparent"
                _hover={{ bg: "gray.100" }}
                _dark={{ _hover: { bg: "gray.700" } }}
              >
                <Icon as={FiMoreVertical} boxSize={5} />
              </Button>
            </PopoverTrigger>
            <PopoverContent width="12rem" boxShadow="lg">
              <PopoverArrow />
              <PopoverBody>
                <EditPostModal id={id} content={content} />
                <Button
                  size="md"
                  colorScheme="red"
                  ml="2"
                  isLoading={deleteLoading}
                  onClick={async () => {
                    try {
                      setDeleteLoading(true);
                      await dispatch(deletePost({ postId: id })).unwrap();
                      await dispatch(deleteCommentsOfPost({ postId: id })).unwrap();
                      if (fromSinglePostPage) {
                        navigate("/home");
                      }
                      dispatch(getAllPosts());
                      setDeleteLoading(false);
                      toast.success("Post deleted");
                    } catch (error) {
                      toast.error("failed to delete post")
                    }
                  }}
                >
                  Delete
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </Flex>

      {/* Post Content */}
      <Text
        mt="3"
        color={textColor}
        fontSize="md"
        lineHeight="tall"
        whiteSpace="pre-wrap"
        textAlign="start"
      >
        {content}
      </Text>

      <Divider my="3" borderColor={borderColor} />

      {/* Footer Section - Like, Comment, Bookmark */}
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <Icon
            as={likes?.likeCount > 0 ? FaHeart : FaRegHeart}
            color={likes?.likeCount > 0 ? "red.500" : "gray.500"}
            boxSize={5}
            cursor="pointer"
            transition="color 0.2s"
            _hover={{ color: "red.400" }}
            onClick={() => {
              likes?.likeCount > 0
                ? dispatch(disLikePost({ postId: id, token }))
                : dispatch(likePost({ postId: id, token }));
            }}
          />
          <Text ml="2" fontSize="sm" color="gray.500">
            {likes?.likeCount || 0}
          </Text>
        </Flex>

        <Box as={Link} to={`/posts/${id}`} display="flex" alignItems="center">
          <Icon as={FaRegCommentAlt} boxSize={5} color="gray.500" />
          <Text ml="2" fontSize="sm" color="gray.500">
            Comment
          </Text>
        </Box>

        <Icon
          as={
            bookmarks.find((post) => post.id === id) ? FaBookmark : FaRegBookmark
          }
          color={
            bookmarks.find((post) => post.id === id) ? "blue.500" : "gray.500"
          }
          boxSize={5}
          cursor="pointer"
          transition="color 0.2s"
          _hover={{ color: "blue.400" }}
          onClick={() => {
            bookmarks.find((post) => post.id === id)
              ? dispatch(removePostFromBookmark({ postId: id, token }))
              : dispatch(bookmarkPost({ postId: id, token }));
          }}
        />
      </Flex>
    </Box>
  );
}

export { PostCard };
