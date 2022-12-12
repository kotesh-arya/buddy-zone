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

import { RiImageAddLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../features/post/postsSlice";

function EditPostModal({ id, content }) {
  const dispatch = useDispatch();
  const { user, token } = useSelector((store) => store.auth);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [contentData, setContentData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    content: content,
  });
  return (
    <>
      <Button bg={"#08a0e9"} onClick={onOpen}>
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editing Post</ModalHeader>
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
                    defaultValue={content}
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
                      dispatch(
                        editPost({ postData: contentData, postId: id, token })
                      );
                      onClose();
                    }}
                  >
                    DONE
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

export { EditPostModal };
