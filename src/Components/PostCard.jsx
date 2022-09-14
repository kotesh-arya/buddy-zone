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
function PostCard() {
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Box
      bg={bgColor}
      boxShadow={"2xl"}
      marginBottom={"2rem"}
      borderRadius={"15px"}
      width={"35rem"}
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
          <Box display={"flex"} alignItems="center">
            <Avatar
              marginRight={"10px"}
              name="Kotesh Mudila"
              src="https://avatars.githubusercontent.com/u/69259490?v=4"
            />

            <Text as="strong">Kotesh Mudila</Text>
          </Box>
          <Icon as={FaRegBookmark} />
        </Flex>
        <Flex
          flexDirection={"column"}
          alignItems="flex-start"
          padding={" 0 2rem "}
        >
          <Image
            width={"100%"}
            objectFit={"cover"}
            src="https://avatars.githubusercontent.com/u/69259490?v=4"
          />
          <Text margin={" 10px 15px"} as="strong">
            #NewProfilePic
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
          <Icon as={FaRegCommentAlt} />
          <Icon as={FaShareAlt} />
          <Icon as={FiMoreVertical} />
        </Flex>
      </Flex>
    </Box>
  );
}

export { PostCard };
