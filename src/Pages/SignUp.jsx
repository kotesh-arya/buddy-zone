import React from "react";
import {
  Container,
  Flex,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Navbar } from "../Components/Navbar";
import { Link } from "react-router-dom";
function SignUp() {
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  return (
    <Box backgroundColor={bgColor}>
      <Navbar />
      <Container
        maxW="container.xl"
        // backgroundColor="green.300"
        p={0}
      >
        <Flex
          h="100vh"
          py={20}
          // backgroundColor="red.300"
          justifyContent="center"
        >
          <VStack
            // display={"flex"}
            borderRadius={20}
            bg={bgColor}
            boxShadow="2xl"
            w="28rem"
            // h="35rem"
            paddingX={25}
            marginTop={4}
            alignItems="center"
          >
            <Heading size="xl" marginX={"auto"} marginY="3">
              {" "}
              Signup
            </Heading>
            {/* <Text>This is a label for the above heading.. </Text> */}
            <SimpleGrid columns={2} columnGap={3} rowGap={6} width="full">
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input type={"text"} placeholder="Kotesh" />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input type={"text"} placeholder="Mudila" />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>E-mail Address</FormLabel>
                  <Input type={"text"} placeholder="kotesharya@gmail.com" />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input type={"password"} placeholder="********" />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <Link to="/signup">
                  <Button bg={"#08a0e9"} color="white" width={"full"}>
                    Signup
                  </Button>
                </Link>
              </GridItem>
              <GridItem colSpan={2}>
                <Link to="/signin">
                  <Button bg={"#08a0e9"} color="white" width={"full"}>
                    Already have an Account
                  </Button>
                </Link>
              </GridItem>
            </SimpleGrid>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
}

export { SignUp };
