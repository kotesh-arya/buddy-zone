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
  Button,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "../assets/buddy-zone-blue.png";
import { Image } from "@chakra-ui/react";
import { Navbar } from "../Components/Navbar";

function SignIn() {
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
          // marginTop="10px"
          // backgroundColor="orange.200"
          justifyContent="center"
          alignItems="center"
        >
          <VStack
            // borderRadius={20}
            // bg="gray.50"
            // w="25rem"
            // paddingX={10}
            // alignItems="center"
            boxShadow="2xl"
            borderRadius={20}
            bg={bgColor}
            w="25rem"
            // h="35rem"
            paddingX={18}
            paddingY={18}
            marginTop={4}
            alignItems="center"
          >
            <Heading size="xl" marginX={"auto"} marginY="3">
              {" "}
              Login
            </Heading>
            {/* <Text>This is a label for the above heading.. </Text> */}
            <SimpleGrid columns={2} columnGap={3} rowGap={6} width="full">
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>E-mail </FormLabel>
                  <Input type={"text"} placeholder="Kotesharya@gmail.com" />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input type={"Password"} placeholder="********" />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                {" "}
                <Button bg={"#08a0e9"} color="white" width={"full"}>
                  Sign In
                </Button>
              </GridItem>
              <GridItem colSpan={2}>
                {" "}
                <Link to="/signup">
                  {" "}
                  <Button bg={"#08a0e9"} color="white" width={"full"}>
                    Create new Account
                  </Button>{" "}
                </Link>
              </GridItem>
            </SimpleGrid>
          </VStack>
          <VStack
            borderRadius={20}
            // bg="blue.200"
            w="half"
            h="full"
            py={10}
            alignItems="center"
            // spacing={0}
          >
            <VStack
              spacing={"0px"}
              //  backgroundColor="green.200"
            >
              <Image
                src={Logo}
                boxSize="470px"
                objectFit="contain"
                alt="Buddy-zone-logo"
                marginBottom="-100px"
                // backgroundColor={"orange.200"}
              />
              <Text as="strong" fontSize={20}>
                Join the Zone - for the cone
              </Text>
            </VStack>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
}

export { SignIn };
