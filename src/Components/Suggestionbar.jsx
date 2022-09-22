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
  const { users } = useSelector((store) => store.users);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      width={"23rem"}
      padding={" 2rem 1rem"}
      bg={bgColor}
      borderRadius={"10px"}
      position={"fixed"}
      right={"0"}
      marginRight={"2rem"}
    >
     
      <Box bg="black.600">
        <VStack
        >
          <Flex
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"full"}
          >
            <Text as={"strong"}>Who to Follow </Text>
            <Button bg={"#08a0e9"}>Show more</Button>
          </Flex>
          <Divider />
          {users.map((user) => {
            return <UserMiniCard key={user._id} {...user} />;
          })}
        </VStack>
      </Box>
    </Box>
  );
}

export { Suggestionbar };
