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
  Textarea,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { editUser } from "../features/users/singleUserSlice";

function EditUserModal({ firstname, lastname, bio, website }) {
  const { token } = useSelector((store) => store.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({
    firstname,
    lastname,
    bio,
    website,
  });
  const handleEditUserProfile = async (e) => {
    e.preventDefault();
    const res = await dispatch(editUser({ userData: profileData, token }));
  };
  return (
    <>
      <Button bg={"#08a0e9"} onClick={onOpen}>
        Edit Profile
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editing Profile</ModalHeader>
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
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type={"text"}
                    name="firstname"
                    // defaultValue={firstname}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        firstname: e.target.value,
                      })
                    }
                    placeholder="Kotesh"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type={"text"}
                    name="lastname"
                    // defaultValue={lastname}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        lastname: e.target.value,
                      })
                    }
                    placeholder="Mudila"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Website</FormLabel>
                  <Input
                    type={"text"}
                    name="website"
                    // defaultValue={website}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        website: e.target.value,
                      })
                    }
                    placeholder="www.user.com"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Bio</FormLabel>
                  <Textarea
                    type={"text"}
                    name="bio"
                    // value={user.bio}
                    // defaultValue={bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    placeholder="A brief note about you"
                  />
                </FormControl>

                <Box
                  width={"100%"}
                  // bg={"blue"}
                  padding={"1rem 0"}
                  marginTop={"2rem"}
                >
                  <Button
                    bg={"#08a0e9"}
                    color="white"
                    width={"100%"}
                    marginBottom={"1rem"}
                    onClick={(e) => {
                      handleEditUserProfile(e);
                      onClose();
                    }}
                  >
                    save
                  </Button>
                </Box>
              </Box>
            </form>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export { EditUserModal };
