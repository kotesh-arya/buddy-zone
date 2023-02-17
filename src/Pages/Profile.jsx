import React, { useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { getSingleUser, getUserPosts } from "../features/users/singleUserSlice";
import { Link, useParams } from "react-router-dom";
import { EditUserModal } from "../Components/EditUserModal";
import { signOut } from "../features/auth/authSlice";
import { BottomNavigation } from "../Components/BottomNavigation";

function Profile() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const {
    profile: { userProfile },
    posts: { userPosts },
  } = useSelector((store) => store.singleUser);
  const latestOrderPosts = [...userPosts].reverse();
  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    dispatch(getSingleUser(userId));
    dispatch(getUserPosts(userId));
  }, []);

  return (
    <Box>
      <Sidebar />
      <Navbar />
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={{
          base: "column",
          md: "column",
          lg: "column",
          xl: "row",
        }}
        alignItems={{
          base: "center",
          md: "flex-end",
          lg: "flex-end",
          xl: "flex-start",
        }}
        justifyContent={{
          base: "center",
          md: "center",
          lg: "center",
          xl: "flex-end",
        }}
        padding={"80px 0px"}
        paddingRight={{ sm: "0rem", md: "0rem", lg: "1.5rem", xl: "0rem" }}
      >
        <VStack
          width={{ base: "100%", md: "75%", lg: "80%", xl: "59%" }}
          spacing={12}
          marginRight={{ base: "0rem", md: "1rem", lg: "0.5rem", xl: "1.3rem" }}
        >
          <Flex
            justifyContent={"space-between"}
            width="100%"
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
              borderRadius={"5px"}
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
            <Text as={"strong"}>
              {userProfile?.following.length} Following |{" "}
              {userProfile?.followers.length} Followers
            </Text>

            <Text as={"strong"}>My Website:{userProfile?.website}</Text>
            <Text as={"strong"}>Bio: {userProfile?.bio}</Text>

            {userProfile?.username === user?.username ? (
              <Box width={"60%"}>
                <EditUserModal {...user} />
                <Button
                  marginTop={"10px"}
                  bg={"transparent"}
                  border={"1px solid #08a0e9"}
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
            <Heading
              marginBottom={"1rem"}
            >
              Recent Posts
            </Heading>
            {latestOrderPosts.map((post) => {
              return <PostCard key={post._id} {...post} />;
            })}
          </Box>
        </VStack>
        <Suggestionbar />
      </Box>
      <BottomNavigation />
    </Box>
  );
}

export { Profile };
