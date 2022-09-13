import React from "react";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
function Bookmarks() {
  return (
    <div>
      <Navbar />
      <Flex
        // bg={"green"}
        justifyContent={"space-between"}
        padding={"80px 20px"}
      >
        <Sidebar />
        <VStack bg="tomato" width={"40rem"} height="80px">
          ji
        </VStack>
        <Box bg="tomato" width={"20rem"} height="80px">
          bu
        </Box>
      </Flex>
    </div>
  );
}

export { Bookmarks };
