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
  Divider, useColorModeValue
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
  const {
    user: { id, username },
    user,
    token,
  } = useSelector((store) => store.auth);

  useEffect(() => {
    if (userId) {
      dispatch(getSingleUser(userId));
      dispatch(getUserPosts(userId));
    }
  }, [dispatch, userId]);

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh">
      <Navbar />

      <Flex width="100%" flexDirection={{ base: "column", md: "row" }} justifyContent={{ md: "center" }} maxW="1200px" mx="auto">
        {/* Sidebar */}
        <Box display={{ base: "none", md: "block" }} width={{ md: "20%", lg: "15%" }}>
          <Sidebar />
        </Box>

        {/* Profile Content */}
        <Box flex="1" display="flex" flexDirection="column" alignItems="center" p={{ base: 4, md: 8 }} width={{ base: "100%", md: "60%" }}
          marginTop={{ base: "1rem", md: "3.5rem" }}

        >
          {/* Profile Banner */}
          <Box position="relative" textAlign="center" width="100%">
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
              name={`${user?.firstName} ${user?.lastName}`}
              src={user?.avatarURL}
              position="absolute"
              left="50%"
              transform="translateX(-50%)"
              bottom="-30px"
              border="4px solid white"
            />
          </Box>

          {/* User Info */}
          <VStack spacing={4} mt="50px" textAlign="center">
            <Heading>{user?.firstName} {user?.lastName}</Heading>
            <Text fontSize="lg" color="gray.600">@{user?.username}</Text>
            <Text fontSize="md">{user?.following?.length} Following | {user?.followers?.length} Followers</Text>
            {user?.website && (
              <Text fontSize="md">
                Website: <Link to={user.website} target="_blank" color="blue.500">{user.website}</Link>
              </Text>
            )}
            <Text fontSize="md">Bio: {user?.bio || "No bio available"}</Text>

            {user?.username === user?.username ? (
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
          <Box mt={8} width="100%" maxW="600px">
            <Heading size="lg" mb={4}>Recent Posts</Heading>
            {userPosts?.length > 0 ? (
              userPosts.map((post) => <PostCard key={post._id} {...post} />)
            ) : (
              <Text textAlign="center" color="gray.500">No posts yet.</Text>
            )}
          </Box>
        </Box>

        {/* Suggestionbar for large screens */}
        <Box display={{ base: "none", xl: "block" }} width={{ lg: "25%" }}>
          <Suggestionbar />
        </Box>
      </Flex>

      {/* Bottom Navigation for mobile */}
      <Box display={{ base: "block", md: "none" }}>
        <BottomNavigation />
      </Box>
    </Box>

  );
}

export { Profile };
