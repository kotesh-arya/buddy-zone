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
  useColorModeValue,Spinner
} from "@chakra-ui/react";
import { Navbar } from "../Components/Navbar";
import { Link } from "react-router-dom";
import { signUp } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupLoading, setSignupLoading] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
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

    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      setSignupLoading(false);
      toast.error("Please fill out all fields!");
      return;
    }

    try {
      const res = await dispatch(signUp(user));

      toast.success("Sign-up successful!");
      navigate("/home"); // Redirect to Home page
    } catch (error) {
      toast.error(error.message || "Sign-up failed. Please try again.");
    } finally {
      setSignupLoading(false);
    }
  };
  return (
    <Box height={"100vh"} backgroundColor={bgColor}>
      {/* <Navbar /> */}
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
                    name="firstName"
                    value={user.firstName}
                    onChange={userInputHandler}
                    placeholder="Kotesh"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type={"text"}
                    name="lastName"
                    value={user.lastName}
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
                    bg={signupLoading ? "gray.500" : "#08a0e9"} // Using Chakra's color
                    _hover={{ bg: signupLoading ? "gray.500" : "#08a0e9" }} // Prevent hover color change while loading
                    color="white"
                    width={"100%"}
                    marginBottom={"1rem"}
                    onClick={() => signupHandler(user)}
                    isDisabled={signupLoading} // Prevents multiple clicks
                  >
                    {signupLoading ?  <Spinner size="lg" color="blue.400" /> : "Signup"}
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
