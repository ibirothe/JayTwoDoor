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
  Switch,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";
import editBgLight from '../../assets/edit_bg_light.png';
import editBgDark from '../../assets/edit_bg_dark.png';
import AssigneeButton from "../Assignee/AssigneeButton";

export const AddUpdateTodoModal = ({
  editable = false,
  defaultValues = {},
  onSuccess = () => {},
  ...rest
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { todoId } = useParams();
  const { handleSubmit, register, control, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { 
      ...defaultValues, 
      assignee: defaultValues.assignee ?? 0
    },
  });

  const onSubmit = async (values) => {
    try {
      if (editable) {
        await axiosInstance.put(`/todo/${todoId}`, values);
      } else {
        await axiosInstance.post(`/todo/create/`, values);
      }
      toast({
        title: editable ? "Todo Updated" : "Todo Added",
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
      <Button w="100%"
        onClick={onOpen}
        backgroundColor={useColorModeValue("#958867ff", "#5c5563ff")}
        textColor={"#ffffffff"}
        variant="outline"
        rounded="full"
      >
        {editable ? "UPDATE 2Door" : "ADD 2Door"}
      </Button>
      <Modal
        closeOnOverlayClick={false}
        size="xl"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader
              background={useColorModeValue(
                        "linear-gradient(90deg, #f4e3d8ff, #f6d2d6ff)",
                        "linear-gradient(90deg, #1e191aff, #251a28ff)"
                    )}>
              {editable ? "Update 2Door" : "ADD 2Door"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
            backgroundImage={useColorModeValue(
              `url(${editBgLight})`,
              `url(${editBgDark})`
            )}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat">
              <FormControl isInvalid={errors.title}>
                <Input
                  placeholder="Todo Title...."
                  background={useColorModeValue(
                        "linear-gradient(90deg, #f4e3d8ff, #f6d2d6ff)",
                        "linear-gradient(90deg, #1e191aff, #251a28ff)"
                    )}
                  type="text"
                  variant="outline"
                  size="lg"
                  mt={6}
                  {...register("title", {
                    required: "This is required field",
                    minLength: {
                      value: 1,
                      message: "Title must be at least 1 characters",
                    },
                    maxLength: {
                      value: 55,
                      message: "Title must be at most 55 characters",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.description}>
                <Textarea
                    rows={5}
                    placeholder="Add description...."
                    background={useColorModeValue(
                        "linear-gradient(90deg, #f4e3d8ff, #f6d2d6ff)",
                        "linear-gradient(90deg, #1e191aff, #251a28ff)"
                    )}
                  type="test"
                  variant="outline"
                  size="lg"
                  mt={6}
                  {...register("description", {
                    required: "This is required field",
                    minLength: {
                      value: 1,
                      message: "Description must be at least 1 characters",
                    },
                    maxLength: {
                      value: 200,
                      message: "Description must be at most 200 characters",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>
              <Stack direction="row" spacing={2} align={"center"} justify={"center"}>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <FormControl ml={6} mt={6} display="flex" alignItems={"center"}>
                      <FormLabel htmlFor="is-done">Status</FormLabel>
                      <Switch
                        onChange={(e) => field.onChange(e.target.checked)}
                        isChecked={field.value}
                        id="id-done"
                        size="md"
                        name="status"
                        isDisabled={false}
                        isLoading={false}
                        colorScheme="purple"
                        variant="ghost"
                      />
                    </FormControl>
                  )}
                />
              <Controller
                control={control}
                name="assignee"
                render={({ field }) => (
                  <FormControl mt={6} display="flex">
                    <FormLabel htmlFor="assignee">Assignee</FormLabel>
                    <AssigneeButton
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                )}
              />
            </Stack>
            </ModalBody>
            <ModalFooter background={useColorModeValue(
                        "linear-gradient(90deg, #f4e3d8ff, #f6d2d6ff)",
                        "linear-gradient(90deg, #1e191aff, #251a28ff)"
                    )}>
              <Stack direction="row" spacing={4}>
                <Button onClick={onClose}
                disabled={isSubmitting}
                rounded={"full"}>
                  Close
                </Button>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  rounded={"full"}
                  backgroundColor={useColorModeValue("#958867ff", "#5c5563ff")}
                  textColor={"#ffffffff"}
                  loadingText={editable ? "Updating" : "Creating"}
                >
                  {editable ? "Update" : "Create"}
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};