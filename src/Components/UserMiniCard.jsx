import React from "react";
import { Flex, Box, Avatar, Text, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getSingleUser } from "../features/users/singleUserSlice";
import { Link } from "react-router-dom";

function UserMiniCard({ _id, firstName, lastName, username, userProfile }) {
  const dispatch = useDispatch();

  return (
    <Flex
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"full"}
    >
      <Box
        as={Link}
        to={`/users/${_id}`}
        onClick={() => {
          dispatch(getSingleUser(_id));
        }}
        width={"60%"}
        display={"flex"}
        alignItems={"center"}
      >
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
