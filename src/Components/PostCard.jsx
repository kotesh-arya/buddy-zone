import React from "react";
import { Box, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import {
  FaRegBookmark,
  FaRegHeart,
  FaRegCommentAlt,
  FaShareAlt,
} from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { Icon, Avatar } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  getSinglePost,
  getSinglePostComments,
} from "../features/post/singlePostSlice";

import { Link } from "react-router-dom";
import { getSingleUser } from "../features/users/singleUserSlice";
function PostCard({
  _id,
  username,
  content,
  userProfile,
  firstName,
  lastName,
}) {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const dispatch = useDispatch();
  return (
    <Box
      as={Link}
      to={`/posts/${_id}`}
      bg={bgColor}
      boxShadow={"2xl"}
      marginBottom={"2rem"}
      borderRadius={"15px"}
      width={"35rem"}
      onClick={() => {
        dispatch(getSinglePost(_id));
        dispatch(getSinglePostComments(_id));
      }}
    >
      <Flex bg={bgColor} borderRadius={"15px"} flexDirection={"column"}>
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
            to={`/user/${_id}`}
            onClick={() => {
              dispatch(getSingleUser(_id));
            }}
            display={"flex"}
            alignItems="center"
          >
            <Avatar
              marginRight={"10px"}
              name={`${firstName} ${lastName}`}
              src={userProfile}
            />

            <Text as="strong">
              {firstName} {lastName}
            </Text>
          </Box>
          <Icon as={FaRegBookmark} />
        </Flex>
        <Flex
          flexDirection={"column"}
          alignItems="flex-start"
          padding={" 0 2rem "}
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
          <Icon as={FaRegHeart} />
          <Icon
            onClick={() => {
              dispatch(getSinglePostComments(_id));
            }}
            as={FaRegCommentAlt}
          />
          <Icon as={FaShareAlt} />
          <Icon as={FiMoreVertical} />
        </Flex>
      </Flex>
    </Box>
  );
}

export { PostCard };
