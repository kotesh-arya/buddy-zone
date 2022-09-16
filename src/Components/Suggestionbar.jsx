import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Text,
  VStack,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { UserMiniCard } from "./UserMiniCard";
function Suggestionbar() {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const { users } = useSelector((store) => store.users);
  console.log(users);

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
      // height={"30rem"}
      marginRight={"2rem"}
    >
      <Box>
        <Input width={"90%"} placeholder="Search Friends..." />
      </Box>
      <Box bg="black.600">
        <VStack
        //  bg="green.600"
        >
          <Flex
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"full"}
            marginTop={"2rem"}
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
