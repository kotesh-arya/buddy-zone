import React, { useEffect } from "react";
import {
  Box,
  Divider,
  Flex,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { UserMiniCard } from "./UserMiniCard";
import { getUsers } from "../features/users/usersSlice";

function Suggestionbar() {
  const dispatch = useDispatch();
  const bgColor = useColorModeValue("white", "gray.700");
  // const boxShadow = useColorModeValue("lg", "dark-lg");
  const textColor = useColorModeValue("gray.700", "whiteAlpha.900");

  const { users } = useSelector((store) => store.users);
  const {
    user: { userId },
  } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const usersList = users
    ?.filter((user) => user._id !== userId)
    .filter((user) => user.firstName);

  return (
    <>
      {usersList.length > 0 && (
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
            {usersList?.map((user) => (
              <UserMiniCard key={user._id} {...user} />
            ))}
          </VStack>
        </Box>
      )}
    </>
  );
}

export { Suggestionbar };
