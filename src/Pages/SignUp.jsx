import React from "react";
import { useState } from "react";
import {
  Container,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Navbar } from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

import { USER_DATA, USER_TOKEN } from "../constants";
import { signupService } from "../services/AuthServices/SignupService";

function SignUp() {
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });
  const userInputHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const signupHandler = async (user) => {
    console.log("entered user", user);

    if (
      user.firstname === "" ||
      user.lastname === "" ||
      user.username === "" ||
      user.password === ""
    ) {
      console.log("please check your inputs again!");
    } else {
      const res = await dispatch(signUp(user));
      localStorage.setItem(USER_DATA, JSON.stringify(res.payload.createdUser));
      localStorage.setItem(USER_TOKEN, res.payload.encodedToken);
      navigate("/");
    }
  };

  return (
    <Box height={"100vh"} backgroundColor={bgColor}>
      <Navbar />
      <Container maxW="container.xl" p={0}>
        <Flex
          h="90vh"
          // bg={"pink"}
          paddingTop={"4rem"}
          justifyContent="center"
          alignItems={"center"}
        >
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
              Signup
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
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type={"text"}
                    name="firstname"
                    value={user.firstname}
                    onChange={(e) => userInputHandler(e)}
                    placeholder="Kotesh"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type={"text"}
                    name="lastname"
                    value={user.lastname}
                    onChange={(e) => userInputHandler(e)}
                    placeholder="Mudila"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type={"text"}
                    name="username"
                    value={user.username}
                    onChange={(e) => userInputHandler(e)}
                    placeholder="kotesharya@gmail.com"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type={"password"}
                    name="password"
                    value={user.password}
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
                      signupHandler(user);
                    }}
                  >
                    Signup
                  </Button>

                  <Button
                    as={Link}
                    to="/signin"
                    outline={"1px #08a0e9 "}
                    variant="outline"
                    color="#08a0e9"
                    width={"100%"}
                  >
                    Already have an Account
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

export { SignUp };
