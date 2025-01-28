import React, { useState } from "react";
import {
  Container,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { Navbar } from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { USER_DATA, USER_TOKEN } from "../constants";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";

function SignUp() {
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signupLoading, setSignupLoading] = useState(false);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const userInputHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const signupHandler = async (user) => {
    setSignupLoading(true);
    if (
      user.firstname === "" ||
      user.lastname === "" ||
      user.email === "" ||
      user.password === ""
    ) {
      setSignupLoading(false);
      toast.error("Please fill out all fields!");
    } else {
      try {
        const res = await dispatch(signUp(user));
        // const res =  signUp(user);
        console.log("signup response", res);
        setSignupLoading(false);
        toast.success("Sign-up successful!");
        console.log("response for user registration", res);
      } catch (error) {
        setSignupLoading(false);
        toast.error("Sign-up failed. Please try again.");
      }
    }
  };
  return (
    <Box height={"100vh"} backgroundColor={bgColor}>
      <Navbar />
      <Container maxW="container.xl" p={0}>
        <Flex
          h="90vh"
          paddingTop={"7rem"}
          justifyContent="center"
          alignItems={"center"}
        >
          <Flex
            borderRadius={20}
            w={{ base: "20rem", md: "25rem", lg: "28rem" }}
            display={"flex"}
            padding={"1rem 2rem"}
            flexDirection={"column"}
            alignItems="center"
            bg="whiteAlpha.100"
            backdropFilter="blur(20px)"
            boxShadow="0 4px 15px rgba(0, 0, 0, 0.2)"
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
              >
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type={"text"}
                    name="firstname"
                    value={user.firstname}
                    onChange={userInputHandler}
                    placeholder="Kotesh"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type={"text"}
                    name="lastname"
                    value={user.lastname}
                    onChange={userInputHandler}
                    placeholder="Mudila"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type={"text"}
                    name="email"
                    value={user.email}
                    onChange={userInputHandler}
                    placeholder="kotesharya@gmail.com"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={user.password}
                      onChange={userInputHandler}
                      placeholder="********"
                    />
                    <InputRightElement>
                      <Button
                        size="sm"
                        onClick={togglePasswordVisibility}
                        bg="transparent"
                        _hover={{ bg: "transparent" }}
                      >
                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Box width={"100%"} padding={"1rem 0"} marginTop={"2rem"}>
                  <Button
                    bg={"#08a0e9"}
                    color="white"
                    width={"100%"}
                    marginBottom={"1rem"}
                    onClick={() => signupHandler(user)}
                  >
                    {signupLoading ? "Signing Up" : "Signup"}
                  </Button>

                  <Button
                    as={Link}
                    to="/"
                    outline={"1px #08a0e9"}
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
