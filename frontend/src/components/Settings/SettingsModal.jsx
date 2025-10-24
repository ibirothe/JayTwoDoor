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
  Radio,
  RadioGroup,
  HStack,
  Stack,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import axiosInstance from "../../services/axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/JWTAuthContext";
import editBgLight from "../../assets/edit_bg_light.png";
import editBgDark from "../../assets/edit_bg_dark.png";
import { MdSettings, MdFace, MdFace2, MdFace3, MdFace4, MdFace5, MdFace6 } from "react-icons/md";

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

const iconItems = [
  { value: "0", icon: <Box as={MdFace} fontSize={{ base: "18px", md: "32px", lg: "40px" }} /> },
  { value: "1", icon: <Box as={MdFace2} fontSize={{ base: "18px", md: "32px", lg: "40px" }} /> },
  { value: "2", icon: <Box as={MdFace3} fontSize={{ base: "18px", md: "32px", lg: "40px" }} /> },
  { value: "3", icon: <Box as={MdFace4} fontSize={{ base: "18px", md: "32px", lg: "40px" }} /> },
  { value: "4", icon: <Box as={MdFace5} fontSize={{ base: "18px", md: "32px", lg: "40px" }} /> },
  { value: "5", icon: <Box as={MdFace6} fontSize={{ base: "18px", md: "32px", lg: "40px" }} /> },
];

const timeZones = Intl.supportedValuesOf("timeZone");

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: {} });

  useEffect(() => {
    if (user) {
      reset({
        spouse_a_name: user.spouse_a_name || "",
        spouse_a_email: user.spouse_a_email || "",
        spouse_a_icon: String(user.spouse_a_icon || 0),
        spouse_b_name: user.spouse_b_name || "",
        spouse_b_email: user.spouse_b_email || "",
        spouse_b_icon: String(user.spouse_b_icon || 1),
        zone: String(user.zone || Intl.DateTimeFormat().resolvedOptions().timeZone),
      });
    }
  }, [user, reset]);

  const onSubmit = async (values) => {
    try {
      values.spouse_a_icon = Number(values.spouse_a_icon);
      values.spouse_b_icon = Number(values.spouse_b_icon);

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
        size={{base:"sm", md:"md"}}
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
              {/* User A Name */}
              <FormControl isInvalid={errors.spouse_a_name} mt={2}>
                <FormLabel>Name - User A</FormLabel>
                <Input
                  placeholder="Spouse A Name"
                  background={inputBg}
                  type="text"
                  size="sm"
                  required
                  {...register("spouse_a_name", { maxLength: { value: 100, message: "Too long" } })}
                />
                <FormErrorMessage>{errors.spouse_a_name?.message}</FormErrorMessage>
              </FormControl>

              {/* User A Email */}
              <FormControl isInvalid={errors.spouse_a_email} mt={2}>
                <FormLabel>Email - User A</FormLabel>
                <Input
                  placeholder="Spouse A Email"
                  background={inputBg}
                  type="email"
                  size="sm"
                  required
                  {...register("spouse_a_email", { maxLength: { value: 100, message: "Too long" } })}
                />
                <FormErrorMessage>{errors.spouse_a_email?.message}</FormErrorMessage>
              </FormControl>

              {/* User A Icon */}
              <FormControl isInvalid={errors.spouse_a_icon} mt={2}>
                <FormLabel>User A Icon</FormLabel>
                <Controller
                  name="spouse_a_icon"
                  control={control}
                  defaultValue="0"
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <HStack gap="4">
                        {iconItems.map((item) => (
                          <Radio key={item.value} value={item.value} size={"md"}>
                            {item.icon}
                          </Radio>
                        ))}
                      </HStack>
                    </RadioGroup>
                  )}
                />
                <FormErrorMessage>{errors.spouse_a_icon?.message}</FormErrorMessage>
              </FormControl>

              {/* User B Name */}
              <FormControl isInvalid={errors.spouse_b_name} mt={2}>
                <FormLabel>Name - User B</FormLabel>
                <Input
                  placeholder="Spouse B Name"
                  background={inputBg}
                  type="text"
                  size="sm"
                  required
                  {...register("spouse_b_name", { maxLength: { value: 100, message: "Too long" } })}
                />
                <FormErrorMessage>{errors.spouse_b_name?.message}</FormErrorMessage>
              </FormControl>

              {/* User B Email */}
              <FormControl isInvalid={errors.spouse_b_email} mt={2}>
                <FormLabel>Email - User B</FormLabel>
                <Input
                  placeholder="Spouse B Email"
                  background={inputBg}
                  type="email"
                  size="sm"
                  required
                  {...register("spouse_b_email", { maxLength: { value: 100, message: "Too long" } })}
                />
                <FormErrorMessage>{errors.spouse_b_email?.message}</FormErrorMessage>
              </FormControl>

              {/* User B Icon */}
              <FormControl isInvalid={errors.spouse_b_icon} mt={2}>
                <FormLabel>User B Icon</FormLabel>
                <Controller
                  name="spouse_b_icon"
                  control={control}
                  defaultValue="1"
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <HStack gap="4">
                        {iconItems.map((item) => (
                          <Radio key={item.value} value={item.value} size={"md"}> 
                            {item.icon}
                          </Radio>
                        ))}
                      </HStack>
                    </RadioGroup>
                  )}
                />
                <FormErrorMessage>{errors.spouse_b_icon?.message}</FormErrorMessage>
              </FormControl>
              {/* Time Zone Selector */}
                <FormControl isInvalid={errors.zone} mt={4} mb={4}>
                  <FormLabel>Time Zone</FormLabel>
                  <Controller
                    name="zone"
                    control={control}
                    defaultValue={user.zone || Intl.DateTimeFormat().resolvedOptions().timeZone}
                    render={({ field }) => (
                      <Input
                        as="select"
                        {...field}
                        background={inputBg}
                        size="sm"
                        required
                      >
                        {timeZones.map((tz) => (
                          <option key={tz} value={tz}>
                            {tz}
                          </option>
                        ))}
                      </Input>
                    )}
                  />
                  <FormErrorMessage>{errors.zone?.message}</FormErrorMessage>
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
