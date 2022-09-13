import React from "react";
import {
  Button,
  Flex,
  Text,
  useColorMode,
  Icon,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import Logo from "../assets/buddy-zone-blue.png";
import { ImSun } from "react-icons/im";
function Navbar() {
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  // const btnBg = useColorModeValue("gray.50", "whiteAlpha.100");
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
        <Button onClick={toggleColorMode} variant="link">
          <Icon as={ImSun} />
        </Button>
      </Flex>
    </div>
  );
}

export { Navbar };
