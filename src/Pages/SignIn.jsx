import React, { useState } from "react";
import {
  Container,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/buddy-zone-blue.png";
import { Navbar } from "../Components/Navbar";
import { useDispatch } from "react-redux";
import { logIn } from "../features/auth/authSlice";
import { USER_DATA, USER_TOKEN } from "../constants";

function SignIn() {
  const location = useLocation();
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, setLoginUser] = useState({ username: "", password: "" });
  const [tester] = useState({
    username: "koteshmudila",
    password: "koteshmudila@123",
  });

  const userInputHandler = (e) => {
    setLoginUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginHandler = async (loginUser) => {
    console.log("from the login handler function");

    if (loginUser.username === "" || loginUser.password === "") {
      console.log("Please enter Valid credentials!!");
    } else {
      const res = await dispatch(logIn(loginUser));
      console.log("RESPONSE", res.payload.foundUser);

      if (res.payload.foundUser !== undefined) {
        localStorage.setItem(USER_DATA, JSON.stringify(res.payload.foundUser));
        localStorage.setItem(USER_TOKEN, res.payload.encodedToken);
        navigate("/home");

        if (location?.state) {
          navigate(location?.state?.from?.pathname);
        } else {
          navigate("/home");
        }
      } else {
        console.log("check your credentials!!");
      }
    }
  };

  return (
    <Box
      position="relative"
      backgroundColor={bgColor}
      minHeight="100vh"
      overflow="hidden"
    >
      {/* Background Circles */}
      <Box
        position="absolute"
        w="300px"
        h="300px"
        bg="blue.200"
        borderRadius="full"
        top="10%"
        left="20%"
        opacity="0.4"
        filter="blur(100px)"
      />
      <Box
        position="absolute"
        w="400px"
        h="400px"
        bg="purple.200"
        borderRadius="full"
        bottom="10%"
        right="15%"
        opacity="0.3"
        filter="blur(150px)"
      />
      {/* NavBar */}
      <Navbar />

      {/* Layout container */}
      <Container maxW="container.xl" padding="5rem">
        <Flex justifyContent="center" alignItems="center" gap="10rem">
          {/* Image container */}
          <Box
            display={{ base: "none", md: "flex" }}
            flexDirection="column"
            alignItems="center"
          >
            <Image
              src={Logo}
              w="34rem"
              objectFit="contain"
              alt="Buddy-zone-logo"
            />
            <Text as="strong" fontSize={20}>
              Only Zone for the friendly Ones
            </Text>
          </Box>

          {/* Glassmorphic Signin Form */}
          <Flex
            borderRadius="20px"
            w={{ base: "full", md: "28rem" }}
            display="flex"
            flexDirection="column"
            padding="2rem"
            bg="whiteAlpha.100"
            backdropFilter="blur(20px)"
            boxShadow="0 4px 15px rgba(0, 0, 0, 0.2)"
          >
            <Heading size="xl" marginX="auto" marginY="3" color="white.900">
              Signin
            </Heading>
            <form onSubmit={(e) => e.preventDefault()}>
              <Box alignItems="center" display="flex" flexDirection="column">
                <FormControl marginBottom="10px">
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="text"
                    name="email"
                    value={loginUser.email}
                    onChange={userInputHandler}
                    placeholder="kotesharya@gmail.com"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={loginUser.password}
                    onChange={userInputHandler}
                    placeholder="********"
                  />
                </FormControl>
                <Box width="100%" padding="1rem 0" marginTop="2rem">
                  <Button
                    bg="#08a0e9"
                    color="white"
                    width="100%"
                    marginBottom="1rem"
                    onClick={() => loginHandler(loginUser)}
                  >
                    SignIn
                  </Button>
                  <Button
                    as={Link}
                    to="/signup"
                    outline="1px #08a0e9"
                    variant="outline"
                    color="#08a0e9"
                    width="100%"
                    marginBottom="1rem"
                  >
                    Create Account
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      loginHandler(tester);
                      navigate("/home");
                    }}
                    bg="#08a0e9"
                    width="100%"
                  >
                    Guest Login
                  </Button>
                </Box>
              </Box>
            </form>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default SignIn;
