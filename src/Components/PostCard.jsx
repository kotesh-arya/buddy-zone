import React, { useEffect, useState } from "react";
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
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner
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
  addComment,
  deleteCommentsOfPost,
  dislikePost,
  getSinglePost,
  getSinglePostComments,
  likePost,
} from "../features/post/singlePostSlice";
// import Moment from "moment";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import {
  deletePost,
  getAllPosts,
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
  fromSinglePostPage,
  // postComments,
}) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loadingPostId, setLoadingPostId] = useState(null);
  const [commetingPostId, setCommetingPostId] = useState(null);


  const { user: { userId, email } } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { userBookmarks, allBookmarks } = useSelector((store) => store.bookmark);
  const {

    comments: { postsComments, isLoading: commentsLoading },
  } = useSelector((store) => store.singlePost);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [comment, setComment] = useState({
    username: username,
    text: "",
  });


  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const navigate = useNavigate();
  const allPostBookmarkCount = {};

  Object.values(allBookmarks).flat().forEach(({ postId }) => {
    allPostBookmarkCount[postId] = (allPostBookmarkCount[postId] || 0) + 1;
  });
  const postBookmarkCount = allPostBookmarkCount[id];
  const postComments = postsComments[id] || [];
  useEffect(() => {
    dispatch(getSinglePostComments(id));
  }, [id, dispatch]);


  const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"];
  const [size, setSize] = useState(sizes[2]); // Default to "md"
  console.log(size);
  useEffect(() => {
    const width = window.innerWidth;
    const index = Math.min(Math.floor(width / 320), sizes.length - 1);
    setSize(sizes[index]);
  }, [sizes]);
  return (
    <Box
      bg={cardBg}
      boxShadow="lg"
      borderRadius="12px"
      padding="2rem"
      marginY="1rem"
      width="100%"
      maxW="600px"
      // as={Link}
      // to={`/post/${id}`}
      // border="2px solid red"
      onClick={() => {
        if (fromSinglePostPage) {
        } else {
          navigate(`/post/${id}`)
        }
      }}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Avatar name={`${firstName} ${lastName}`} src={userImage} size="md" />
          {/* <Avatar name={`${firstName} ${lastName}`} src={userImage} size={size} shape="square"/> */}

          <Box ml="3">
            <Text fontWeight="bold" fontSize="lg">{firstName} {lastName}</Text>
            <Text fontSize="sm" color="gray.500">
              {/* <Moment fromNow>{updatedAt}</Moment> */}
              {format(new Date(updatedAt), 'yyyy/MM/dd')}
            </Text>
          </Box>
        </Flex>

        {(username === email && fromSinglePostPage) && (
          <Popover>
            <PopoverTrigger>
              <Button size="sm" bg="gray.700" _hover={{ bg: "gray.600" }}>
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
                  onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      setDeleteLoading(true);
                      await dispatch(deletePost({ postId: id })).unwrap();
                      await dispatch(deleteCommentsOfPost({ postId: id })).unwrap();
                      if (fromSinglePostPage) navigate("/home");
                      dispatch(getAllPosts());
                      setDeleteLoading(false);
                      toast.success("Post deleted");
                    } catch (error) {
                      toast.error("Failed to delete post");
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

      <Text mt="3"
        color={textColor}
        fontSize="md"
        lineHeight="tall"
        whiteSpace="pre-wrap"
        textAlign="start">
        {content}
      </Text>

      <Divider my="3" borderColor={borderColor} />

      <Flex justifyContent="space-between" alignItems="center">

        {/* Like icon  */}

        <Flex alignItems="center">
          <Icon
            as={likes?.likedBy?.includes(userId) ? FaHeart : FaRegHeart}
            color={likes?.likedBy?.includes(userId) ? "red.500" : "gray.500"}
            boxSize={5}
            cursor="pointer"
            transition="color 0.2s"
            _hover={{ color: "red.400" }}
            onClick={async (e) => {
              e.stopPropagation();
              if (likes?.likedBy?.includes(userId)) {
                await dispatch(dislikePost({ postId: id, userId })).unwrap();
                dispatch(getSinglePost(id));
                dispatch(getAllPosts());
              } else {
                await dispatch(likePost({ postId: id, userId })).unwrap();
                dispatch(getSinglePost(id));
                dispatch(getAllPosts());
              }
            }}
          />
          <Text ml="2" fontSize="sm" color="gray.500">{likes?.likedBy?.length || 0}</Text>
        </Flex>



        {/* Comment icon with its modal */}
        <Box display="flex" alignItems="center" cursor="pointer"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}>
          {
            (commentsLoading && commetingPostId === id) ? <Spinner size="sm" color="white.900" /> : <Icon as={FaRegCommentAlt} boxSize={5} color="gray.500" />
          }
          <Text ml="2" fontWeight="bold" fontSize="sm" color="gray.500">{postComments?.length || 0}</Text>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent width="45vw">
            <ModalHeader>Comments</ModalHeader>
            <ModalCloseButton />
            <ModalBody paddingY="2rem" >
              <Flex alignItems="center" mb="3">
                <Avatar name={`${firstName} ${lastName}`} src={userImage} size="sm" />
                <Box ml="2">
                  <Text fontWeight="bold" fontSize="sm">{firstName} {lastName}</Text>
                  <Text fontSize="xs" color="gray.500">
                    {/* <Moment fromNow>{updatedAt}</Moment> */}
                    {format(new Date(updatedAt), 'yyyy/MM/dd')}
                  </Text>
                </Box>
              </Flex>

              <Flex maxHeight="25vh" overflowY="auto">

                <Text color={textColor} fontSize="md" mb="3">{content}</Text>

              </Flex>
              <Divider my="2" />
              <Flex alignItems="center"   >
                <form onSubmit={(e) => e.preventDefault()} style={{ width: "100%" }}>
                  <Box display="flex" gap={2} >
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
                        setCommetingPostId(id);
                        try {
                          await dispatch(addComment({ postId: id, text: comment.text })).unwrap();
                          setComment((prev) => ({ ...prev, text: "" }));
                          dispatch(getSinglePostComments(id));
                          onClose();
                        } catch (error) {
                          toast.error("Failed to Add comment");
                          onClose();
                        } finally {
                          setCommetingPostId(null);
                        }
                      }}
                    >
                      Post
                    </Button>
                  </Box>
                </form>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>


        {/* Bookmark icon  */}
        <Flex alignItems="center">
          <Icon
            as={
              loadingPostId === id
                ? () => <Spinner size="sm" color="white.900" />
                : userBookmarks?.find((post) => post.postId === id)
                  ? FaBookmark
                  : FaRegBookmark
            }
            color={userBookmarks?.find((post) => post.postId === id) ? "blue.500" : "gray.500"}
            boxSize={5}
            cursor="pointer"
            transition="color 0.2s"
            _hover={{ color: "blue.400" }}
            onClick={async (e) => {
              e.stopPropagation();
              setLoadingPostId(id); // Set loading state for this card
              try {
                if (userBookmarks?.find((post) => post.postId === id)) {
                  await dispatch(removePostFromBookmark({ postId: id, userId: userId })).unwrap();
                  toast.success("Post Removed from bookmarks");
                } else {
                  await dispatch(bookmarkPost({ postId: id, userId: userId })).unwrap();
                  toast.success("Post Added to bookmarks");
                }
              }
              catch (error) {
                toast.error(error.response.data.message);
              }
              finally {
                setLoadingPostId(null); // Reset loading state
              }
            }}
          />
          <Text ml="2" fontWeight="bold" fontSize="sm" color="gray.500">{postBookmarkCount || 0}</Text>
        </Flex>

      </Flex>
    </Box>
  );
}

export { PostCard };
