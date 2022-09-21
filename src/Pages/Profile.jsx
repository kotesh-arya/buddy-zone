import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  VStack,
  Image,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
import { Suggestionbar } from "../Components/Suggestionbar";
import { PostCard } from "../Components/PostCard";
import { useSelector } from "react-redux";
import { getSingleUser, getUserPosts } from "../features/users/singleUserSlice";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
// import axios from "axios";

import { MacroModal } from "../Components/MacroModal";
import { signOut } from "../features/auth/authSlice";

function Profile() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  // console.log(userId);
  const {
    profile: { userProfile },
    posts: { userPosts },
  } = useSelector((store) => store.singleUser);
  const { user } = useSelector((store) => store.auth);

  console.log("current user:", user);
  // console.log("other user:", userProfile.username);
  useEffect(() => {
    dispatch(getSingleUser(userId));
    dispatch(getUserPosts(userId));
  }, []);

  return (
    <Box>
      <Sidebar />
      <Navbar />
      <Flex
        width={"92%"}
        marginRight="auto"
        justifyContent={"center"}
        padding={"80px 10px"}
        flexDirection={"row"}
      >
        <VStack height="80px" width={"100%"} spacing={12}>
          <Flex
            justifyContent={"space-between"}
            width="60%"
            height={"15rem"}
            position={"relative"}
          >
            <Box position={"absolute"} width={"100%"} marginTop={"13rem"}>
              <Avatar
                margin={"auto"}
                size="2xl"
                name={`${userProfile?.firstname} ${userProfile?.lastname}`}
                src={userProfile?.userProfile}
              />
            </Box>

            <Image
              borderRadius={"20px"}
              width={"100%"}
              objectFit={"cover"}
              src="https://wallpapercave.com/wp/wp4447988.jpg"
            />
          </Flex>
          <VStack paddingTop={"3rem"}>
            <Heading as={"strong"}>
              {userProfile?.firstname} {userProfile?.lastname}
            </Heading>
            <Text as={"strong"}>@{userProfile?.username}</Text>
            <Text as={"strong"}>0 Following | 2 Followers</Text>

            <Text as={"strong"}>My Website:{userProfile?.website}</Text>
            <Text as={"strong"}>Bio: {userProfile?.bio}</Text>

            {userProfile?.username === user?.username ? (
              <Box width={"60%"}>
                <MacroModal {...user} />
                <Button
                  bg={"transparent"}
                  border={"1px solid red"}
                  as={Link}
                  to="/"
                  onClick={() => {
                    dispatch(signOut());
                  }}
                >
                  <Text>Logout</Text>
                </Button>
              </Box>
            ) : (
              <Box>
                <Button bg={"#08a0e9"}>
                  <Text>Follow</Text>
                </Button>
              </Box>
            )}
          </VStack>
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Heading marginRight={"25rem"} marginBottom={"1rem"}>
              Recent Posts
            </Heading>
            {userPosts.map((post) => {
              return <PostCard key={post._id} {...post} />;
            })}
          </Box>
        </VStack>
        <Suggestionbar />
      </Flex>
    </Box>
  );
}

export { Profile };
