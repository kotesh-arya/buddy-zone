import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
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

function NewPostModal() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((store) => store.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [postContent, setPostContent] = useState("");
  const [contentData, setContentData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    content: "",
  });
  return (
    <>
      <Button bg={"#08a0e9"} onClick={onOpen}>
        <Icon marginRight="15px" as={FaPen} /> New Post
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
                // bg={"red"}
              >
                <Box
                  width={"100%"}
                  // bg={"blue"}
                  padding={"1rem 0"}
                  // marginTop={"2rem"}
                  display={"flex"}
                  flexDir={"column"}
                  alignItems={"flex-end"}
                >
                  <Textarea
                    onChange={(e) => {
                      // setPostContent(e.target.value);
                      setContentData((prev) => {
                        return { ...prev, content: e.target.value };
                      });
                    }}
                    resize={"none"}
                  />{" "}
                  <Icon as={RiImageAddLine} />
                  {/* {contentData.content} */}
                  <Button
                    bg={"#08a0e9"}
                    color="white"
                    width={"20%"}
                    marginBottom={"1rem"}
                    onClick={() => {
                      // setContentData((prev) => {
                      //   return { ...prev, content: postContent };
                      // });
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

          {/* <ModalFooter> */}
          {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button> */}
          {/* <Button variant="ghost">Secondary Action</Button> */}
          {/* </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}

export { NewPostModal };
