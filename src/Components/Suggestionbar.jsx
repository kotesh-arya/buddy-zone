import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
function Suggestionbar() {
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      width={"23rem"}
      padding={" 2rem 1rem"}
      bg={bgColor}
      // border={"2px solid #08a0e9"}
      borderRadius={"10px"}
      position={"fixed"}
      right={"0"}
      height={"30rem"}
      marginRight={"2rem"}
    >
      <Box>
        <Input
          //  bg="green.600"
          width={"90%"}
          placeholder="Search Friends..."
        />
      </Box>
      <Box bg="black.600">
        <VStack>
          <Flex
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            // bg={"white"}
            width={"full"}
          >
            <Text as={"strong"}>Who to Follow </Text>
            <Button bg={"#08a0e9"}>Show more</Button>
          </Flex>
          <Divider />
          <Flex
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            // bg={"white"}
            width={"full"}
          >
            <Box 
            // bg={"red"}
             width={"60%"} display={"flex"} alignItems={"center"}>
              {" "}
              <Avatar marginRight={"10px"}
                name="Dan Abrahmov"
                src="https://avatars.githubusercontent.com/u/69259490?v=4"
              />
              <Text as={"strong"}>User 1</Text>
            </Box>
            <Button bg={"#08a0e9"}>Follow +</Button>
          </Flex>
          <Flex
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            // bg={"white"}
            width={"full"}
          >
            <Box 
            // bg={"red"}
             width={"60%"} display={"flex"} alignItems={"center"}>
              {" "}
              <Avatar marginRight={"10px"}
                name="Dan Abrahmov"
                src="https://avatars.githubusercontent.com/u/69259490?v=4"
              />
              <Text as={"strong"}>User 2</Text>
            </Box>
            <Button bg={"#08a0e9"}>Follow +</Button>
          </Flex>
          <Flex
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            // bg={"white"}
            width={"full"}
          >
            <Box 
            // bg={"red"}
             width={"60%"} display={"flex"} alignItems={"center"}>
              {" "}
              <Avatar marginRight={"10px"}
                name="Dan Abrahmov"
                src="https://avatars.githubusercontent.com/u/69259490?v=4"
              />
              <Text as={"strong"}>User 3</Text>
            </Box>
            <Button bg={"#08a0e9"}>Follow +</Button>
          </Flex>
          <Flex
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            // bg={"white"}
            width={"full"}
          >
            <Box 
            // bg={"red"}
             width={"60%"} display={"flex"} alignItems={"center"}>
              {" "}
              <Avatar marginRight={"10px"}
                name="Dan Abrahmov"
                src="https://avatars.githubusercontent.com/u/69259490?v=4"
              />
              <Text as={"strong"}>User 4</Text>
            </Box>
            <Button bg={"#08a0e9"}>Follow +</Button>
          </Flex>
          <Flex
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            // bg={"white"}
            width={"full"}
          >
            <Box 
            // bg={"red"}
             width={"60%"} display={"flex"} alignItems={"center"}>
              {" "}
              <Avatar marginRight={"10px"}
                name="Dan Abrahmov"
                src="https://avatars.githubusercontent.com/u/69259490?v=4"
              />
              <Text as={"strong"}>User 5</Text>
            </Box>
            <Button bg={"#08a0e9"}>Follow +</Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}

export { Suggestionbar };
