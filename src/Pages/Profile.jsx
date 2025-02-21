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
  Divider,
} from "@chakra-ui/react";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
import { Suggestionbar } from "../Components/Suggestionbar";
import { PostCard } from "../Components/PostCard";
import { useSelector, useDispatch } from "react-redux";
import { getSingleUser, getUserPosts } from "../features/users/singleUserSlice";
import { Link, useParams } from "react-router-dom";
import { EditUserModal } from "../Components/EditUserModal";
import { logOut } from "../features/auth/authSlice";
import { BottomNavigation } from "../Components/BottomNavigation";

function Profile() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  
  const {
    profile: { userProfile },
    posts: { userPosts },
  } = useSelector((store) => store.singleUser);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (userId) {
      dispatch(getSingleUser(userId));
      dispatch(getUserPosts(userId));
    }
  }, [dispatch, userId]);

  return (
    <Flex direction="column">
      <Navbar />
      <Flex>
        <Sidebar />
        <Box flex="1" p={{ base: 4, md: 8 }} ml={{ md: "12rem" }} mr={{ lg: "20rem", xl: "0rem" }}>
          {/* Profile Banner */}
          <Box position="relative" textAlign="center">
            <Image
              borderRadius="lg"
              width="100%"
              height="200px"
              objectFit="cover"
              src="https://wallpapercave.com/wp/wp4447988.jpg"
              alt="Profile Banner"
            />
            <Avatar
              size="2xl"
              name={`${userProfile?.firstName} ${userProfile?.lastName}`}
              src={userProfile?.avatarURL}
              position="absolute"
              left="50%"
              transform="translateX(-50%)"
              bottom="-30px"
              border="4px solid white"
            />
          </Box>

          {/* User Info */}
          <VStack spacing={4} mt="50px" textAlign="center">
            <Heading>
              {userProfile?.firstName} {userProfile?.lastName}
            </Heading>
            <Text fontSize="lg" color="gray.600">
              @{userProfile?.username}
            </Text>
            <Text fontSize="md">
              {userProfile?.following?.length} Following | {userProfile?.followers?.length} Followers
            </Text>
            {userProfile?.website && (
              <Text fontSize="md">
                Website: <Link to={userProfile.website} target="_blank" color="blue.500">{userProfile.website}</Link>
              </Text>
            )}
            <Text fontSize="md">Bio: {userProfile?.bio || "No bio available"}</Text>

            {userProfile?.username === user?.username ? (
              <VStack>
                <EditUserModal {...user} />
                <Button
                  mt={2}
                  colorScheme="red"
                  variant="outline"
                  as={Link}
                  to="/"
                  onClick={() => dispatch(logOut())}
                >
                  Logout
                </Button>
              </VStack>
            ) : (
              <Button colorScheme="blue">Follow</Button>
            )}
          </VStack>

          <Divider my={6} />

          {/* User Posts */}
          <Box mt={8}>
            <Heading size="lg" mb={4}>Recent Posts</Heading>
            {userPosts?.length > 0 ? (
              userPosts.map((post) => <PostCard key={post._id} {...post} />)
            ) : (
              <Text textAlign="center" color="gray.500">No posts yet.</Text>
            )}
          </Box>
        </Box>
        {/* <Suggestionbar /> */}
      </Flex>
      <BottomNavigation />
    </Flex>
  );
}

export { Profile };
