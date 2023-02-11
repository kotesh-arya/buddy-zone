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
} from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/buddy-zone-blue.png";
import { Image } from "@chakra-ui/react";
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
  const [tester, setTester] = useState({
    username: "koteshmudila",
    password: "koteshmudila@123",
  });

  const userInputHandler = (e) => {
    setLoginUser((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const loginHandler = async (loginUser) => {
    if (loginUser.username === "" || loginUser.password === "") {
      console.log("hiiiii");
    } else {
      const res = await dispatch(logIn(loginUser));
      console.log(res);
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
      backgroundColor={bgColor}
      h="100vh"
      display={"flex"}
      flexDirection={"row"}
      justifyContent="center"
      alignItems={"start"}
    >
      <Navbar />
      <Container
        maxW="container.xl"
        marginTop={{ base: "0rem", md: "0rem", lg: "8rem" }}
        padding={{ base: "0rem", md: "5rem", lg: "2rem" }}
        h={{ base: "100vh", md: "100vh", lg: "40rem" }}
        display={"flex"}
        flexDirection={{ base: "column", md: "row", lg: null }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          flexDirection={"column"}
          alignItems={"center"}
          display={{ base: "none", md: "flex", lg: null }}
        >
          <Image
            src={Logo}
            w={{ base: "15rem", md: "25rem", lg: "34rem" }}
            objectFit="contain"
            alt="Buddy-zone-logo"
          />
          <Text as="strong" fontSize={20}>
            Only Zone for the friendly Ones
          </Text>
        </Box>
        <Flex
          borderRadius={20}
          boxShadow="2xl"
          border={"1px solid grey"}
          w={{ base: "20rem", md: "25rem", lg: "28rem" }}
          display={"flex"}
          padding={"1rem 2rem"}
          flexDirection={"column"}
        >
          <Heading size="xl" marginX={"auto"} marginY="3">
            Signin
          </Heading>
          <form onSubmit={(e) => e.preventDefault()}>
            <Box
              alignItems={"center"}
              display={"flex"}
              flexDirection={"column"}
              width="100%"
            >
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  type={"text"}
                  name="username"
                  value={loginUser.username}
                  onChange={(e) => userInputHandler(e)}
                  placeholder="kotesharya@gmail.com"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type={"password"}
                  name="password"
                  value={loginUser.password}
                  onChange={(e) => userInputHandler(e)}
                  placeholder="********"
                />
              </FormControl>

              <Box width={"100%"} padding={"1rem 0"} marginTop={"2rem"}>
                <Button
                  bg={"#08a0e9"}
                  color="white"
                  width={"100%"}
                  marginBottom={"1rem"}
                  onClick={() => {
                    loginHandler(loginUser);
                  }}
                >
                  SignIn
                </Button>

                <Button
                  as={Link}
                  to="/signup"
                  outline={"1px #08a0e9 "}
                  variant="outline"
                  color="#08a0e9"
                  width={"100%"}
                  marginBottom={"1rem"}
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
                  width={"100%"}
                >
                  Guest Login
                </Button>
              </Box>
            </Box>
          </form>
        </Flex>
      </Container>
    </Box>
  );
}

export { SignIn };
