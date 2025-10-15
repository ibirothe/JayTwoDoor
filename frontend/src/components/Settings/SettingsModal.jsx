import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../services/axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/JWTAuthContext";
import editBgLight from "../../assets/edit_bg_light.png";
import editBgDark from "../../assets/edit_bg_dark.png";
import { MdSettings } from "react-icons/md";

export const UserPropertyModal = ({ onSuccess = () => {}, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { user } = useContext(AuthContext);

  const buttonBg = useColorModeValue("#958867ff", "#5c5563ff");
  const headerBg = useColorModeValue(
    "linear-gradient(90deg, #f4e3d8ff, #f6d2d6ff)",
    "linear-gradient(90deg, #1e191aff, #251a28ff)"
  );
  const inputBg = useColorModeValue(
    "linear-gradient(90deg, #f4e3d8ff, #f6d2d6ff)",
    "linear-gradient(90deg, #1e191aff, #251a28ff)"
  );
  const modalBgImage = useColorModeValue(editBgLight, editBgDark);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {},
  });

  // Pre-fill modal fields with user data
  useEffect(() => {
    if (user) {
      reset({
        spouse_a_name: user.spouse_a_name || "",
        spouse_a_email: user.spouse_a_email || "",
        spouse_a_icon: user.spouse_a_icon || 0,
        spouse_b_name: user.spouse_b_name || "",
        spouse_b_email: user.spouse_b_email || "",
        spouse_b_icon: user.spouse_b_icon || 1,
      });
    }
  }, [user, reset]);

  const onSubmit = async (values) => {
    try {
      await axiosInstance.post("/users/update", values);
      toast({
        title: "User updated successfully",
        status: "success",
        isClosable: true,
        duration: 1500,
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong. Please try again.",
        status: "error",
        isClosable: true,
        duration: 2000,
      });
    }
  };

  return (
    <Box {...rest}>
      <Button
        w="100%"
        onClick={onOpen}
        backgroundColor={buttonBg}
        textColor="#ffffffff"
        variant="outline"
        rounded="full"
      >
        <MdSettings />
      </Button>

      <Modal closeOnOverlayClick={false} size="xl" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader background={headerBg}>Team Settings</ModalHeader>
            <ModalCloseButton />
            <ModalBody
              backgroundImage={`url(${modalBgImage})`}
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
            >
              <FormControl isInvalid={errors.spouse_a_name} mt={2}>
                <FormLabel>Name - User A</FormLabel>
                <Input
                  placeholder="Spouse A Name"
                  background={inputBg}
                  type="text"
                  required={true}
                  size="sm"
                  {...register("spouse_a_name", { maxLength: { value: 100, message: "Too long" } })}
                />
                <FormErrorMessage>{errors.spouse_a_name?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.spouse_a_email} mt={2}>
                <FormLabel>Email - User A</FormLabel>
                <Input
                  placeholder="Spouse A Email"
                  background={inputBg}
                  type="email"
                  required={true}
                  size="sm"
                  {...register("spouse_a_email", { maxLength: { value: 100, message: "Too long" } })}
                />
                <FormErrorMessage>{errors.spouse_a_email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.spouse_a_icon} mt={2}>
                <FormLabel>User A Icon</FormLabel>
                <Input
                  placeholder="Spouse A Icon"
                  background={inputBg}
                  type="number"
                  size="sm"
                  {...register("spouse_a_icon")}
                />
                <FormErrorMessage>{errors.spouse_a_icon?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.spouse_b_name} mt={2}>
                <FormLabel>Name - User B</FormLabel>
                <Input
                  placeholder="Spouse B Name"
                  background={inputBg}
                  type="text"
                  required={true}
                  size="sm"
                  {...register("spouse_b_name", { maxLength: { value: 100, message: "Too long" } })}
                />
                <FormErrorMessage>{errors.spouse_b_name?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.spouse_b_email} mt={2}>
                <FormLabel>Email - User B</FormLabel>
                <Input
                  placeholder="Spouse B Email"
                  background={inputBg}
                  required={true}
                  type="email"
                  size="sm"
                  {...register("spouse_b_email", { maxLength: { value: 100, message: "Too long" } })}
                />
                <FormErrorMessage>{errors.spouse_b_email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.spouse_b_icon} mt={2}>
                <FormLabel>User B Icon</FormLabel>
                <Input
                  placeholder="Spouse B Icon"
                  background={inputBg}
                  type="number"
                  size="sm"
                  {...register("spouse_b_icon")}
                />
                <FormErrorMessage>{errors.spouse_b_icon?.message}</FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter background={headerBg}>
              <Stack direction="row" spacing={4}>
                <Button onClick={onClose} disabled={isSubmitting} rounded="full">
                  Close
                </Button>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  rounded="full"
                  backgroundColor={buttonBg}
                  textColor="#ffffffff"
                >
                  Save Changes
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};
