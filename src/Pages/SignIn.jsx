import React, { useState } from "react";
import {
  Container,
  Flex,
  VStack,
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

import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../features/auth/authSlice";
import { USER_DATA, USER_TOKEN } from "../constants";

function SignIn() {
  const { isModalOpen } = useSelector((store) => store.modal);
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
      console.log("please fill both credentials");
    } else {
      const res = await dispatch(logIn(loginUser));
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
    <Box backgroundColor={bgColor}>
      <Navbar />
      <Container maxW="container.xl" p={0}>
        <Flex
          h="100vh"
          // bg={"pink"}
          paddingTop={"4rem"}
          justifyContent="center"
          alignItems={"center"}
        >
          <VStack
            borderRadius={20}
            // w="half"
            h="full"
            py={10}
            // bg={"green"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              // bg={"blue"}
              // h="full"
            >
              <Image
                src={Logo}
                width="600px"
                objectFit="contain"
                alt="Buddy-zone-logo"
                // marginBottom="-100px"
              />
              <Text as="strong" fontSize={20}>
                One & Only Zone for the friendly Ones
              </Text>
            </Box>
          </VStack>
          <Flex
            borderRadius={20}
            // bg={bgColor}
            boxShadow="2xl"
            border={"1px solid gray"}
            w="28rem"
            display={"flex"}
            padding={"1rem 2rem"}
            // marginTop={4}
            // height={"80%"}
            flexDirection={"column"}
            // bg={"green"}
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
                // bg={"red"}
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

                <Box
                  width={"100%"}
                  // bg={"blue"}
                  padding={"1rem 0"}
                  marginTop={"2rem"}
                >
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
                    // variantColor="#08a0e9"
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
                    // variantColor="#08a0e9"
                    bg="#08a0e9"
                    width={"100%"}
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

export { SignIn };
