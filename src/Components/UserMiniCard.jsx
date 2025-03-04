import React, { useState } from "react";
import { Flex, Box, Avatar, Text, Button, Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getSingleUser, getUserPosts, unfollowUser } from "../features/users/singleUserSlice";

import { Link } from "react-router-dom";

function UserMiniCard({ _id, firstName, lastName, username, userImage }) {
  const [actionUserId, setActionUserId] = useState("")
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  const {
    profile: { following, isLoading }
  } = useSelector((store) => store.singleUser);


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
          name={`${firstName} ${lastName}`}
          src={userImage}
        />
        <Text fontWeight={"bold"} fontSize={{ base: "sm", md: "sm", lg: "sm" }}>
          {firstName}
          {lastName}
        </Text>
      </Box>
      <Button
        onClick={async () => {
          setActionUserId(_id);
          if (following?.find((userId) => userId === _id)) {
            await dispatch(unfollowUser({ userId: _id, token })).unwrap();
            setActionUserId("");
          } else {
            await dispatch(followUser({ userId: _id, token })).unwrap();
            setActionUserId("");
          }
        }}
        bg={following?.find((userId) => userId === _id) ? "" : "#08a0e9"}
        border={` ${following?.find((userId) => userId === _id) ? " 1px solid #08a0e9" : ""} `}
        width="6rem"
      >
        {(isLoading && actionUserId === _id) ? <Spinner size="sm" color="white.900" /> : following?.find((userId) => userId === _id) ? "Unfollow" : "Follow +"}
      </Button>
    </Flex>
  );
}

export { UserMiniCard };
