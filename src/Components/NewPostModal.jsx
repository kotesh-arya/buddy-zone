import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Icon,
  Textarea,
} from "@chakra-ui/react";
import { FaPen } from "react-icons/fa";
import { RiImageAddLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getAllPosts } from "../features/post/postsSlice";

function NewPostModal({ fromBottom }) {
  const dispatch = useDispatch();
  const { user, token } = useSelector((store) => store.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [contentData, setContentData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    content: "",
  });
  return (
    <>
      <Button bg= {{ base: "", md: "#08a0e9", lg: "#08a0e9" }} onClick={onOpen}>
        <Icon marginRight={{ base: "0", md: "15px", lg: "15px" }} as={FaPen} />{" "}
        {!fromBottom && "New Post"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={(e) => e.preventDefault()}>
              <Box
                alignItems={"center"}
                display={"flex"}
                flexDirection={"column"}
                width="100%"
              >
                <Box
                  width={"100%"}
                  padding={"1rem 0"}
                  display={"flex"}
                  flexDir={"column"}
                  alignItems={"flex-end"}
                >
                  <Textarea
                    onChange={(e) => {
                      setContentData((prev) => {
                        return { ...prev, content: e.target.value };
                      });
                    }}
                    resize={"none"}
                  />{" "}
                  <Icon as={RiImageAddLine} />
                  <Button
                    bg={"#08a0e9"}
                    color="white"
                    width={"20%"}
                    marginBottom={"1rem"}
                    onClick={() => {
                      dispatch(createPost({ postData: contentData, token }));
                      getAllPosts();
                      onClose();
                    }}
                  >
                    POST
                  </Button>
                </Box>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export { NewPostModal };
