import React from "react";
import {
  Avatar,
  Box,
  Heading,
  Span,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
function CommentContainer({ _id, username, text, votes }) {
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Box
      bg={bgColor}
      // padding={"1rem"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"flex-start"}
      marginBottom={"15px"}
    >
      <Box display={"flex"} alignItems={"center"} flexDirection={"row"}>
        <Avatar src="" name={username} marginRight={"15px"} />
      </Box>
      <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
        {" "}
        <Text as={"strong"}>{username}</Text>
        <Text>{text}</Text>
      </Box>
    </Box>
  );
}

export { CommentContainer };
