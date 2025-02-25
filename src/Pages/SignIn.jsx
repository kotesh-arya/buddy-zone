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
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logIn } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";

function SignIn() {
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginLoading, setLoginLoading] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const userInputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginHandler = async (user) => {
    setLoginLoading(true);

    if (!user.email || !user.password) {
      setLoginLoading(false);
      toast.error("Please fill out all fields!");
      return;
    }

    try {
      const res = await dispatch(logIn(user));

      if (!res.payload?.email) {
        throw new Error("Invalid credentials! Please try again.");
      }

      // No need to manually store data in localStorage; redux-persist handles it
      toast.success("Sign-in successful!");
      navigate(location.state?.from?.pathname || "/home");
    } catch (error) {
      toast.error(error.message || "Sign-in failed. Please try again.");
    } finally {
      setLoginLoading(false);
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
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={userInputHandler}
                    placeholder="Enter your email"
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
                    bg={loginLoading ? "gray.500" : "#08a0e9"}
                    _hover={{ bg: loginLoading ? "gray.500" : "#08a0e9" }}
                    color="white"
                    width={"100%"}
                    marginBottom={"1rem"}
                    onClick={() => loginHandler(user)}
                    isDisabled={loginLoading}
                  >
                    {loginLoading ?  <Spinner size="lg" color="white.900" />
 : "Signin"}
                  </Button>

                  <Button
                    as={Link}
                    to="/signup"
                    outline={"1px #08a0e9"}
                    variant="outline"
                    color="#08a0e9"
                    width={"100%"}
                  >
                    Don't have an Account? Signup
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
