import React from "react";
import { Flex, Box, Avatar, Text, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, getUserPosts } from "../features/users/singleUserSlice";

import { Link } from "react-router-dom";
import { followUser, unfollowUser } from "../features/users/usersSlice";

function UserMiniCard({ _id, firstname, lastname, username, userImage }) {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  const { followedUsers } = useSelector((store) => store.users);
  return (
    <Flex
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"full"}
      // border={"3px solid red"}
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
        // border={"3px solid green"}
        // background={{ base: "red", md: "orange", lg: "green" }}

      >
        <Avatar
          marginRight={{ base: "5px", md: "8px", lg: "5px" }}
          name={`${firstname} ${lastname}`}
          src={userImage}
        />
        <Text
          fontWeight={"bold"}
            fontSize={{ base: "sm", md: "sm", lg: "sm" }}>
          {firstname}
           {lastname}
        </Text>
      </Box>
      <Button
        onClick={() => {
          followedUsers?.find((user) => user._id === _id)
            ? dispatch(unfollowUser({ followUserId: _id, token }))
            : dispatch(followUser({ followUserId: _id, token }));
        }}
        bg={"#08a0e9"}
      >
        {followedUsers.find((user) => user._id === _id)
          ? "Unfollow"
          : "Follow +"}
      </Button>
    </Flex>
  );
}

export { UserMiniCard };
