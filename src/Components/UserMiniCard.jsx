import React from "react";
import { Flex, Box, Avatar, Text, Button } from "@chakra-ui/react";
function UserMiniCard({ firstName, lastName, username, userProfile }) {
  return (
    <Flex
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"full"}
    >
      <Box width={"60%"} display={"flex"} alignItems={"center"}>
        <Avatar
          marginRight={"10px"}
          name={`${firstName} ${lastName}`}
          src={userProfile}
        />
        <Text as={"strong"}>
          {firstName} {lastName}
        </Text>
      </Box>
      <Button bg={"#08a0e9"}>Follow +</Button>
    </Flex>
  );
}

export { UserMiniCard };
