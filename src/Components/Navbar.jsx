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
import { BsMoonStarsFill } from "react-icons/bs";
import { Link } from "react-router-dom";
function Navbar() {
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  return (
    <div>
      <Flex
        bg={bgColor}
        color="black"
        position="fixed"
        width={"100%"}
        justifyContent="space-between"
        px={2}
        py={5}
        zIndex={"100"}
        boxShadow="md"
      >
        <Box as={Link} to="/home">
          <Image
            src={Logo}
            boxSize="70px"
            objectFit="contain"
            alt="Buddy-zone-logo"
            marginY="-20px"
          />
        </Box>
        <Box>
          <Button onClick={toggleColorMode} variant="link">
            {bgColor === "gray.900" ? (
              <Icon as={ImSun} />
            ) : (
              <Icon color={"black"} as={BsMoonStarsFill} />
            )}
          </Button>
        </Box>
      </Flex>
    </div>
  );
}

export { Navbar };
