import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import {
  FaRegBookmark,
  FaRegHeart,
  FaRegCommentAlt,
  FaShareAlt,
  FaHeart,
  FaBookmark,
} from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { Icon, Avatar } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSinglePost,
  getSinglePostComments,
} from "../features/post/singlePostSlice";
// import moment from "moment";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { getSingleUser } from "../features/users/singleUserSlice";
import { deletePost, disLikePost, likePost } from "../features/post/postsSlice";
import { EditPostModal } from "./EditPostModal";
import {
  bookmarkPost,
  removePostFromBookmark,
} from "../features/bookmark/bookmarkSlice";

function PostCard({
  _id,
  updatedAt,
  username,
  content,
  userImage,
  firstname,
  lastname,
  likes,
}) {
  const { token, user } = useSelector((store) => store.auth);
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const dispatch = useDispatch();
  const { bookmarks } = useSelector((store) => store.bookmark);
  return (
    <Box
      bg={bgColor}
      boxShadow={"2xl"}
      marginBottom={"2rem"}
      borderRadius={"15px"}
      width={"40rem"}
    >
      <Flex
        bg={bgColor}
        width={"100%"}
        borderRadius={"15px"}
        flexDirection={"column"}
      >
        <Flex
          bg={"WhiteAlpha"}
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
          padding={"1rem 1rem"}
          borderRadius={"15px"}
        >
          <Box
            as={Link}
            to={`/user/${username}`}
            onClick={() => {
              dispatch(getSingleUser(username));
            }}
            display={"flex"}
            alignItems="center"
          >
            <Avatar
              marginRight={"10px"}
              name={`${firstname} ${lastname}`}
              src={userImage}
            />
            <Heading as="h3" size="md">
              {firstname} {lastname}
            </Heading>
            <Text marginLeft={"5px"} fontSize={"md"}>
              <Moment fromNow>{updatedAt}</Moment>
            </Text>
          </Box>
          {username === user.username && (
            <Box>
              <Popover>
                <PopoverTrigger>
                  <Button bg={"transparent"}>
                    <Icon as={FiMoreVertical} cursor={"pointer"} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent width={"13rem"}>
                  <PopoverArrow />

                  <PopoverBody>
                    <EditPostModal id={_id} content={content} />
                    <Button
                      bg={"#08a0e9"}
                      marginLeft={"10px"}
                      onClick={() => {
                        dispatch(deletePost({ postId: _id, token }));
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
        </Flex>
        <Flex
          as={Link}
          to={`/posts/${_id}`}
          flexDirection={"column"}
          alignItems="flex-start"
          padding={" 0 2rem "}
          // bg={"green"}
          onClick={() => {
            dispatch(getSinglePost(_id));
            dispatch(getSinglePostComments(_id));
          }}
        >
          {/* <Image
            width={"100%"}
            objectFit={"cover"}
            src="https://avatars.githubusercontent.com/u/69259490?v=4"    this image should be conditionally rendered
          /> */}
          <Text textAlign={"left"} margin={" 10px 15px"} as="strong">
            {content}
          </Text>
        </Flex>

        <Flex
          bg={"WhiteAlpha"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems="center"
          padding={"1rem 2rem"}
        >
          <Flex>
            <Icon
              onClick={() => {
                likes?.likeCount > 0
                  ? dispatch(disLikePost({ postId: _id, token }))
                  : dispatch(likePost({ postId: _id, token }));
              }}
              color={likes?.likeCount > 0 ? "red" : " "}
              as={likes?.likeCount > 0 ? FaHeart : FaRegHeart}
              cursor={"pointer"}
            />
          </Flex>
          <Box as={Link} to={`/posts/${_id}`}>
            <Icon
              onClick={() => {
                dispatch(getSinglePostComments(_id));
              }}
              as={FaRegCommentAlt}
            />
          </Box>
          <Icon as={FaShareAlt} />
          <Icon
            onClick={() => {
              bookmarks.find((post) => post._id === _id)
                ? dispatch(removePostFromBookmark({ postId: _id, token }))
                : dispatch(bookmarkPost({ postId: _id, token }));
            }}
            as={
              bookmarks.find((post) => post._id === _id)
                ? FaBookmark
                : FaRegBookmark
            }
            cursor={"pointer"}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export { PostCard };
