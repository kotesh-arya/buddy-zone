import React  from "react";
import {
  Box,
  Divider,
  Flex,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { UserMiniCard } from "./UserMiniCard";

function Suggestionbar() {
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "whiteAlpha.900");

  const { users } = useSelector((store) => store.users);



  return (
    <>
      {users.length > 0 && (
        <Box
          position="fixed"
          top="10rem"
          right="6rem"
          display={{ base: "none", lg: "flex" }}
          flexDirection="column"
          width="20rem"
          p="1.5rem"
          bg={bgColor}
          // boxShadow={boxShadow}
          borderRadius="12px"
        >
          <VStack spacing={3} align="stretch">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontWeight="bold" fontSize="lg" color={textColor}>
                Suggested for you
              </Text>
            </Flex>
            <Divider />
            {users?.map((user) => (
              <UserMiniCard key={user._id} {...user} />
            ))}
          </VStack>
        </Box>
      )}
    </>
  );
}

export { Suggestionbar };
