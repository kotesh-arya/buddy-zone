import React, { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  InputGroup,
  InputRightElement,
  Spinner
} from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logIn } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";

function SignIn() {
  const { isLoggedIn } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginLoading, setLoginLoading] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

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

      toast.success("Sign-in successful!");
      navigate(location.state?.from?.pathname || "/home");
    } catch (error) {
      toast.error(error.message || "Sign-in failed. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home", { replace: true }); // 👈 Replaces history to block back navigation
    }
  }, [isLoggedIn, navigate]);


  if (isLoggedIn) {
    return null; // Already redirected
  }

  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"

    >


      {/* Optional dark overlay: makes the white text visible  */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bg="blackAlpha.600"
        zIndex={-1}
      />

      {/* Glassmorphic form box */}
      <Flex
        w={{ base: "20rem", md: "25rem", lg: "28rem" }}
        flexDirection="column"
        alignItems="center"
        p="2rem"
        borderRadius="2xl"
        bg="whiteAlpha.300"
        backdropFilter="blur(20px)"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.3)"
        border={"1px solid gray"}
      >
        <Heading size="xl" mb="6" color="white">
          Sign in
        </Heading>
        <form onSubmit={(e) => e.preventDefault()} style={{ width: "100%" }}>
          <Box display="flex" flexDirection="column" gap="4">
            <FormControl>
              <FormLabel color="white">Email</FormLabel>
              <Input
                type="text"
                name="email"
                value={user.email}
                onChange={userInputHandler}
                placeholder="Enter your email"
              />
            </FormControl>

            <FormControl>
              <FormLabel color="white">Password</FormLabel>
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

            <Button
              bgGradient="linear(to-r, #08a0e9, #00c9ff)"
              _hover={{
                boxShadow: "0 0 5px #08a0e9, 0 0 10px #00c9ff",
                transform: "scale(1.02)",
              }}
              _active={{
                boxShadow: "0 0 25px #08a0e9, 0 0 50px #00c9ff",
              }}
              color="white"
              width="100%"
              mt="6"
              onClick={() => loginHandler(user)}
              isDisabled={loginLoading}
              transition="all 0.3s ease-in-out"
            >
              {loginLoading ? <Spinner size="lg" color="white.900" /> : "Sign in"}
            </Button>


            <Button
              as={Link}
              to="/signup"
              variant="outline"
              color="#08a0e9"
              borderColor="#08a0e9"
              width="100%"
              _hover={{ bg: "blue.50" }}

            >
              Don't have an Account? Signup
            </Button>
          </Box>
        </form>
      </Flex>
    </Flex>
  );
}

export { SignIn };
