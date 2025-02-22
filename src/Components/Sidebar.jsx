import { Flex, Box, VStack, Icon, Text, Avatar, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdExplore } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../features/auth/authSlice";
import { getSingleUser, getUserPosts } from "../features/users/singleUserSlice";
import { NewPostModal } from "./NewPostModal";
import { getAllBookmarks } from "../features/bookmark/bookmarkSlice";
import { useMediaQuery } from "@chakra-ui/react";

function Sidebar() {
  const dispatch = useDispatch();
  const {
    user: { id, username },
    user,
    token,
  } = useSelector((store) => store.auth);

  const bgColor = useColorModeValue("rgba(255, 255, 255, 0.05)", "rgba(0, 0, 0, 0.3)");
  const activeBg = useColorModeValue("#08a0e9", "#3182ce");
  const inactiveColor = useColorModeValue("gray.400", "gray.300");
  const [isLessThan1270] = useMediaQuery("(max-width: 1270px)");
  console.log("islessthan1270 --->", isLessThan1270);
  const getActiveStyle = ({ isActive }) => ({
    backgroundColor: isActive
      ? (activeBg ? (isLessThan1270 ? "transparent" : activeBg) : "transparent")
      : "transparent",
    color: isActive ? "white" : inactiveColor,
    borderRadius: "8px",
    padding: "12px",
    fontWeight: isActive ? "bold" : "normal",
    transition: "background-color 0.3s ease-in-out, transform 0.2s",
  });

  return (
    <VStack
      height="100vh"
      // width={{ sm: "4rem", md: "14rem" }}  // Adjust width dynamically
      position="fixed"
      top="4"
      left="0"
      // bg="transparent"
      // backdropFilter="blur(10px)"
      borderRadius="12px"
      paddingY="4rem"
      paddingX="1rem"
      spacing={6}
      align="flex-start"
      display={{ base: "none", md: "block" }} // Hide in small screens
    >
      <Flex flexDirection="column" width="full">
        {[
          { to: "/home", label: "Home", icon: AiFillHome },
          { to: "/explore", label: "Explore", icon: MdExplore },
          {
            to: "/bookmarks",
            label: "Bookmarks",
            icon: BsFillBookmarkHeartFill,
            action: () => dispatch(getAllBookmarks(token))
          },
          {
            to: `/user/${id}`,
            label: "Profile",
            icon: CgProfile,
            action: () => {
              dispatch(getSingleUser(id));
              dispatch(getUserPosts(username));
            }
          },
        ].map(({ to, label, icon, action }) => (
          <Box
            as={NavLink}
            to={to}
            key={to}
            onClick={action}
            style={getActiveStyle}
            _hover={{ bg: "rgba(255, 255, 255, 0.15)", transform: "scale(1.05)" }}
            width={isLessThan1270 ? "0" : "full"}
            transition="all 0.2s ease-in-out"
            textAlign={isLessThan1270 ? "end" : "center"}
            border={"2px solid red"}
          >
            <Flex alignItems="center">
              <Icon as={icon} fontSize="1.4rem" mr={isLessThan1270 ? "0px" : "12px"} />
              {!isLessThan1270 && <Text>{label}</Text>}
            </Flex>
          </Box>
        ))}
        <NewPostModal />
      </Flex>

      {user?.email && (
        <Box
          width="full"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          py="0.5rem"
          borderTop="1px solid rgba(255, 255, 255, 0.2)"
          pt="1rem"
        >
          <Box
            as={Link}
            to={`/user/${id}`}
            display="flex"
            alignItems="center"
            _hover={{ transform: "scale(1.05)" }}
            transition="all 0.2s ease-in-out"
          >
            <Avatar name={`${user?.firstName} ${user?.lastName}`} size="sm" />
            <Text ml="10px" fontWeight="medium" color="white">
              {user?.firstName} {user?.lastName}
            </Text>
          </Box>
          <Box
            as={Link}
            to="/"
            onClick={() => {
              dispatch(logOut());
              toast.success("Successfully signed out!");
            }}
            _hover={{ transform: "scale(1.2)" }}
            transition="all 0.2s ease-in-out"
          >
            <Icon as={IoLogOut} fontSize="1.3rem" color="red.400" />
          </Box>
        </Box>
      )}
    </VStack>
  );
}

export { Sidebar };
