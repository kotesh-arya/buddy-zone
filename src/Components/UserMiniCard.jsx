import React from "react";
import { Flex, Box, Avatar, Text, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getSingleUser, getUserPosts } from "../features/users/singleUserSlice";

import { Link } from "react-router-dom";

function UserMiniCard({ _id, firstname, lastname, username, userImage }) {
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
        to={`/user/${_id}`}
        onClick={() => {
          dispatch(getSingleUser(_id));
          dispatch(getUserPosts(username));
        }}
        width={"60%"}
        display={"flex"}
        alignItems={"center"}
      >
        <Avatar
          marginRight={"10px"}
          name={`${firstname} ${lastname}`}
          src={userImage}
        />
        <Text as={"strong"}>
          {firstname} {lastname}
        </Text>
      </Box>
      <Button bg={"#08a0e9"}>Follow +</Button>
    </Flex>
  );
}

export { UserMiniCard };
