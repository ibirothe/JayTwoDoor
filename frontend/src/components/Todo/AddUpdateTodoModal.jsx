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
import { MdEditSquare, MdAddCircle } from "react-icons/md";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";
import editBgLight from "../../assets/edit_bg_light.png";
import editBgDark from "../../assets/edit_bg_dark.png";
import AssigneeButton from "../Assignee/AssigneeButton";

export const AddUpdateTodoModal = ({
  editable = false,
  user,
  onSuccess = () => {},
  ...rest
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { todoId } = useParams();
  const [todo, setTodo] = useState(null);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: false,
      urgent: false,
      assignee: 0,
    },
  });

  useEffect(() => {
    if (editable && todoId) {
      axiosInstance
        .get(`/todo/${todoId}/`)
        .then((res) => {
          setTodo(res.data);
          reset(res.data);
        })
        .catch(console.error);
    }
  }, [editable, todoId, reset]);

  const onSubmit = async (values) => {
    try {
      if (editable) {
        await axiosInstance.put(`/todo/${todoId}/`, values);
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
      <Button
        w="100%"
        onClick={onOpen}
        backgroundColor={useColorModeValue("#958867ff", "#5c5563ff")}
        textColor="#ffffffff"
        variant="outline"
        rounded="full"
      >
        {editable ? <MdEditSquare/> : <MdAddCircle/>}
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
              )}
            >
              {editable ? "Update 2Door" : "Add 2Door"}
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody
              backgroundImage={useColorModeValue(
                `url(${editBgLight})`,
                `url(${editBgDark})`
              )}
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
            >
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
                    minLength: { value: 1, message: "Title must be at least 1 character" },
                    maxLength: { value: 55, message: "Title must be at most 55 characters" },
                  })}
                />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.description}>
                <Textarea
                  rows={5}
                  placeholder="Add description...."
                  background={useColorModeValue(
                    "linear-gradient(90deg, #f4e3d8ff, #f6d2d6ff)",
                    "linear-gradient(90deg, #1e191aff, #251a28ff)"
                  )}
                  variant="outline"
                  size="lg"
                  mt={6}
                  {...register("description", {
                    required: "This is required field",
                    minLength: { value: 1, message: "Description must be at least 1 character" },
                    maxLength: { value: 755, message: "Description must be at most 755 characters" },
                  })}
                />
                <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
              </FormControl>

              <Stack direction="row" spacing={2} align="center" justify="center">
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <FormControl ml={6} mt={6} display="flex" alignItems="center">
                      <FormLabel htmlFor="is-done">Status</FormLabel>
                      <Switch
                        onChange={(e) => field.onChange(e.target.checked)}
                        isChecked={field.value}
                        id="is-done"
                        size="md"
                        colorScheme="purple"
                      />
                    </FormControl>
                  )}
                />

                <Controller
                  control={control}
                  name="urgent"
                  render={({ field }) => (
                    <FormControl ml={6} mt={6} display="flex" alignItems="center">
                      <FormLabel htmlFor="is-urgent" mb="0">
                        Urgent
                      </FormLabel>
                      <Switch
                        id="is-urgent"
                        size="md"
                        colorScheme="red"
                        isChecked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
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
                        user={user}
                      />
                    </FormControl>
                  )}
                />
              </Stack>
            </ModalBody>

            <ModalFooter
              background={useColorModeValue(
                "linear-gradient(90deg, #f4e3d8ff, #f6d2d6ff)",
                "linear-gradient(90deg, #1e191aff, #251a28ff)"
              )}
            >
              <Stack direction="row" spacing={4}>
                <Button onClick={onClose} disabled={isSubmitting} rounded="full">
                  Close
                </Button>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  rounded="full"
                  backgroundColor={useColorModeValue("#958867ff", "#5c5563ff")}
                  textColor="#ffffffff"
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