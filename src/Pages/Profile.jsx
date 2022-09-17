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
import { getSingleUser } from "../features/users/singleUserSlice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

function Profile() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  console.log(userId);
  const { user } = useSelector((store) => store.singleUser);
  // console.log(user);
  useEffect(() => {
    dispatch(getSingleUser(userId));
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
                name={`${user?.firstName} ${user?.lastName}`}
                src={user?.userProfile}
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
              {user?.firstname} {user?.lastname}
            </Heading>
            <Text as={"strong"}>{user?.username}</Text>
            <Text as={"strong"}>0 Following | 2 Followers</Text>

            <Text as={"strong"}>My Website: _________</Text>
            <Text as={"strong"}>Bio: Blended Being</Text>

            {user?.username === "@koteshmudila" ? (
              <Box width={"60%"}>
                <Button marginBottom={"1rem"} bg={"#08a0e9"}>
                  <Text>Edit profile</Text>
                </Button>
                <Button bg={"transparent"} border={"1px solid red"}>
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
            <PostCard />
            <PostCard />
          </Box>
        </VStack>
        <Suggestionbar />
      </Flex>
    </Box>
  );
}

export { Profile };
