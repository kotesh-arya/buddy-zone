import {
  Flex, Box, VStack, Icon, Text, Avatar, useColorModeValue, useMediaQuery, Button, Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
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

function Sidebar() {
  const dispatch = useDispatch();
  const {
    user: { id, username },
    user,
    token,
  } = useSelector((store) => store.auth);

  const textColor =useColorModeValue("gray.700", "whiteAlpha.900");
  const activeBg = useColorModeValue("#08a0e9", "#3182ce");
  const inactiveColor = useColorModeValue("gray.400", "gray.300");
  const [isLessThan1240] = useMediaQuery("(max-width: 1240px)");
  const getActiveStyle = ({ isActive }) => ({
    backgroundColor: isActive
      ? activeBg
      : "transparent",
    color: isActive ? "white" : inactiveColor,
    borderRadius: "8px",
    padding: "12px",
    fontWeight: isActive ? "bold" : "normal",
    transition: "background-color 0.3s ease-in-out, transform 0.2s",
  });

  return (
    <Flex
      height="100vh"
      width={{ sm: "4rem", md: "14rem" }}  // Adjust width dynamically
      position="fixed"
      top="4"
      left="8rem"
      // bg="transparent"
      // backdropFilter="blur(10px)"
      borderRadius="12px"
      paddingY="4rem"
      paddingX="1rem"
      spacing={6}
      flexDir="column"
      justifyContent="flex-start"
      gap="8rem"
      display={{ base: "none", md: "flex" }} // Hide in small screens
    // border={"2px solid red"}

    >
      <Flex flexDirection="column" width="full" alignItems={isLessThan1240 ? "flex-start" : "center"}
      // border={"2px solid blue"}
      >
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
          <Flex
            as={NavLink}
            to={to}
            key={to}
            onClick={action}
            style={getActiveStyle}
            _hover={{ background: "rgba(255, 255, 255, 0.15)", transform: "scale(1.05)" }}
            width={isLessThan1240 ? "none" : "full"}
            transition="all 0.2s ease-in-out"
            justifySelf={isLessThan1240 ? "end" : "center"}
          // border={"2px solid green"}
          mb="0.5rem"
          >
            <Flex alignItems="center" justifyContent="center">
              <Icon as={icon} fontSize="1.4rem" mr={isLessThan1240 ? "0px" : "12px"} />
              {!isLessThan1240 && <Text>{label}</Text>}
            </Flex>
          </Flex>
        ))}
        <NewPostModal />
      </Flex>

      {user?.email && (
        <Box
          width="full"
          display="flex"
          alignItems="center"
          justifyContent={isLessThan1240 ? "flex-start" : "center"}
          py="0.5rem"
          // borderTop="1px solid rgba(255, 255, 255, 0.2)"
          // border={"2px solid green"}
          cursor="pointer"
          pt="1rem"
        >
          <Popover>
            <PopoverTrigger>
              <Flex
                // border={"2px solid blue"}
                alignItems="center"
                width={isLessThan1240 ? "20%" : "90%"}
                justifyContent="flex-start"
                gap="0.8rem"
              >
                <Avatar name={`${user?.firstName} ${user?.lastName}`} size="md" />
                {!isLessThan1240 && <Text fontWeight="bold"
                  color={textColor}
                >
                  {user?.firstName} {user?.lastName}
                </Text>}
              </Flex>

              {/* Logout button container */}
              {/* <Box
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
              </Box> */}

            </PopoverTrigger>
            <PopoverContent width="16rem" boxShadow="lg">
              <PopoverArrow />
              <PopoverBody>
                {/* <EditPostModal id={id} content={content} /> */}
                <Flex>
                  <Button as={Link}
                    to={`/user/${id}`}
                    display="flex"
                    alignItems="center"
                    _hover={{ transform: "scale(1.05)" }}
                    transition="all 0.2s ease-in-out"
                  // border={"2px solid green"}
                  >

                    Visit Profile
                  </Button>
                  <Button
                    size="md"
                    colorScheme="red"
                    ml="2"
                    // isLoading={deleteLoading}
                    onClick={() => {
                      dispatch(logOut());
                      toast.success("Successfully signed out!");
                    }}
                  >
                    Logout
                    {/* <Icon as={IoLogOut} fontSize="1.3rem" color="red.400" /> */}
                  </Button>
                </Flex>

              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>

      )}
    </Flex>
  );
}

export { Sidebar };
