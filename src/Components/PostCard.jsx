import React from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
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
    <Box bg={bgColor} boxShadow={"2xl"} borderRadius={"15px"} width={"35rem"}>
      <Flex bg={bgColor} flexDirection={"column"}>
        <Flex
          bg={"WhiteAlpha"}
          // bg={"pink"}
          // flexDirection={"row"}
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
          padding={"1rem 1rem"}
          borderRadius={"15px"}
        >
          <Box display={"flex"} alignItems="center">
            <Avatar
              marginRight={"10px"}
              name="Dan Abrahmov"
              src="https://avatars.githubusercontent.com/u/69259490?v=4"
            />

            <Text as="strong">Kotesh Mudila</Text>
          </Box>
          {/* <Text as="strong">@KoteshMudila</Text> */}
          <Icon as={FaRegBookmark} />
        </Flex>
        <Flex
          // bg={"WhiteAlpha"}
          // bg={"green.50"}
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
