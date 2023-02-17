import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { UserMiniCard } from "./UserMiniCard";

function Suggestionbar() {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const { users, followedUsers } = useSelector((store) => store.users);
  const {
    user: { _id },
  } = useSelector((store) => store.auth);
  const usersList = users?.filter((user) => user._id !== _id);
  return (
    <Box
      display={{
        base: "none",
        md: "none",
        lg: "flex",
        xl: "flex",
        "2xl": "flex",
      }}
      flexDirection={"column"}
      justifyContent={"space-between"}
      minWidth={"20rem"}
      maxWidth={"21rem"}
      padding={"2rem 1rem"}
      bg={bgColor}
      borderRadius={"10px"}
      marginRight={{md:"auto",lg:"20rem",xl:"0rem"}}
      marginLeft={{md:"auto",lg:"0rem",xl:"0rem"}}
      // border={"3px solid blue"}
    >
      <Box bg="black.600">
        <VStack>
          <Flex
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"full"}
          >
            <Text as={"strong"}>Who to Follow </Text>
          </Flex>
          <Divider />
          {usersList?.map((user) => {
            return <UserMiniCard key={user._id} {...user} />;
          })}
        </VStack>
      </Box>
    </Box>
  );
}

export { Suggestionbar };
