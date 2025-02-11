import React from "react";
import { Flex, Box, Avatar, Text, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, getUserPosts } from "../features/users/singleUserSlice";

import { Link } from "react-router-dom";
import { followUser, unfollowUser } from "../features/users/usersSlice";

function UserMiniCard({ id, firstName, lastName, username, userImage }) {
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
        to={`/user/${id}`}
        onClick={() => {
          dispatch(getSingleUser(id));
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
          name={`${firstName} ${lastName}`}
          src={userImage}
        />
        <Text fontWeight={"bold"} fontSize={{ base: "sm", md: "sm", lg: "sm" }}>
          {firstName}
          {lastName}
        </Text>
      </Box>
      <Button
        onClick={() => {
          followedUsers?.find((user) => user.id === id)
            ? dispatch(unfollowUser({ followUserId: id, token }))
            : dispatch(followUser({ followUserId: id, token }));
        }}
        bg={"#08a0e9"}
      >
        {followedUsers.find((user) => user.id === id) ? "Unfollow" : "Follow +"}
      </Button>
    </Flex>
  );
}

export { UserMiniCard };
