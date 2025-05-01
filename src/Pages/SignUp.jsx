import React, { useState } from "react";
import {
  Container,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  InputGroup,
  InputRightElement,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../features/auth/authSlice";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signupLoading, setSignupLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

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

  const signupHandler = async () => {
    setSignupLoading(true);
    const { firstName, lastName, email, password } = user;

    if (!firstName || !lastName || !email || !password) {
      toast.error("Please fill out all fields!");
      setSignupLoading(false);
      return;
    }

    try {
      await dispatch(signUp(user));
      toast.success("Sign-up successful!");
      navigate("/home");
    } catch (error) {
      toast.error(error.message || "Sign-up failed. Please try again.");
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <Container maxW="md" pt={32}>

      {/* Optional dark overlay: makes the white text visible  */}
      {/* <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bg="blackAlpha.600"
        zIndex={-1}

      /> */}
      <Flex
        direction="column"
        align="center"
        p={8}

        bg="whiteAlpha.300"
        backdropFilter="blur(20px)"
        borderRadius="2xl"
        boxShadow="lg"
        border={"1px solid gray"}
      >
        <Heading mb={6}>Sign Up</Heading>

        <form style={{ width: "100%" }} onSubmit={(e) => e.preventDefault()}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="firstName"
                placeholder="Kotesh"
                value={user.firstName}
                onChange={userInputHandler}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="lastName"
                placeholder="Mudila"
                value={user.lastName}
                onChange={userInputHandler}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="kotesharya@gmail.com"
                value={user.email}
                onChange={userInputHandler}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  value={user.password}
                  onChange={userInputHandler}
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

            <Button
              colorScheme="blue"
              bg="#08a0e9"
              color="white"
              _hover={{ bg: "#0693d0" }}
              onClick={signupHandler}
              isDisabled={signupLoading}
            >
              {signupLoading ? <Spinner size="sm" color="white" /> : "Sign Up"}
            </Button>

            <Button
              as={Link}
              to="/"
              variant="outline"
              color="#08a0e9"
              borderColor="#08a0e9"
              _hover={{ bg: "blue.50" }}
            >
              Already have an account?
            </Button>
          </Stack>
        </form>
      </Flex>
    </Container>
  );
}

export { SignUp };
