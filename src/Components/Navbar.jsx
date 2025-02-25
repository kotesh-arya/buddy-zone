import React from "react";
import {
  Button,
  Flex,
  useColorMode,
  Icon,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { ImSun } from "react-icons/im";
import { BsMoonStarsFill } from "react-icons/bs";
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
        justifyContent="flex-end"
        px={2}
        py={5}
        zIndex={"100"}
        boxShadow="md"
      // border={"2px solid red"}
      >
        {/* <Box as={Link} to="/home">
          <Image
            src={Logo}
            boxSize="70px"
            objectFit="contain"
            alt="Buddy-zone-logo"
            marginY="-20px"
          />
        </Box> */}
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
