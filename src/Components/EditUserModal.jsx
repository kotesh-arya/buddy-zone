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
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea, Spinner
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { editUser } from "../features/users/singleUserSlice";
import { toast } from "react-toastify";

function EditUserModal({ firstName, lastName, bio, website }) {
  const { user } = useSelector((store) => store.auth);
  const {
    profile: { isLoading: userLoading }
  } = useSelector((store) => store.singleUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({
    firstName,
    lastName,
    bio,
    website,
  });
  const handleEditUserProfile = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editUser({ userData: profileData, userId: user.userId })).unwrap();
      onClose();
      toast.success("User profile updated successfully");
    } catch (error) {
      toast.error("Cannot update user profile, try again");
    }
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
              >
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type={"text"}
                    name="firstName"
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        firstName: e.target.value,
                      })
                    }
                    placeholder="Kotesh"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type={"text"}
                    name="lastName"
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        lastName: e.target.value,
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
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    placeholder="A brief note about you"
                  />
                </FormControl>

                <Box width={"100%"} padding={"1rem 0"} marginTop={"2rem"}>
                  <Button
                    bg={"#08a0e9"}
                    color="white"
                    width={"100%"}
                    marginBottom={"1rem"}
                    onClick={(e) => {
                      handleEditUserProfile(e);
                    }}
                  >
                    {
                      userLoading ? <Spinner size="sm" color="white.900" /> : "Save"
                    }
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

export { EditUserModal };
