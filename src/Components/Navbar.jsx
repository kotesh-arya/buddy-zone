import React from "react";
import {
  Button,
  Flex,
  useColorMode,
  Icon,
  Image,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import Logo from "../assets/buddy-zone-blue.png";
import { ImSun } from "react-icons/im";
import { Link } from "react-router-dom";
function Navbar() {
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const say = () => {
    console.log("hi");
  };
  return (
    <div>
      <Flex
        bg={bgColor}
        color="white"
        position="fixed"
        width={"100%"}
        justifyContent="space-between"
        px={2}
        py={5}
        zIndex={"100"}
        boxShadow="md"
      >
        <Box as={Link} to="/">
          <Image
            src={Logo}
            boxSize="70px"
            objectFit="contain"
            alt="Buddy-zone-logo"
            marginY="-20px"
            onClick={() => {
              say();
            }}
          />
        </Box>
        <Button onClick={toggleColorMode} variant="link">
          <Icon as={ImSun} />
        </Button>
      </Flex>
    </div>
  );
}

export { Navbar };
