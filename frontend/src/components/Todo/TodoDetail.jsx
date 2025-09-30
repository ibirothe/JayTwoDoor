import {
  Center,
  Container,
  Spinner,
  Text,
  Box,
  Flex,
  useColorModeValue,
  useToast,
  IconButton,
  CloseButton,
  Code,
  Icon,
} from "@chakra-ui/react";
import { MdDeleteOutline, MdOutlineCreate, MdOutlineUpdate } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { AddUpdateTodoModal } from "./AddUpdateTodoModal";
import detailBgLight from '../../assets/flex_bg_light.png';
import detailBgDark from '../../assets/flex_bg_dark.png';

export const TodoDetail = () => {
  const [todo, setTodo] = useState({});
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);
  const { todoId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const imageBg = useColorModeValue(
    `url(${detailBgLight})`,
    `url(${detailBgDark})`
  );

  const descriptionBg = useColorModeValue(
        "linear-gradient(90deg, #f6d8baff, #fae1e1ff)",
        "linear-gradient(90deg, #1e191aff, #251a28ff)"
      );

  const fetchTodo = () => {
    setLoading(true);
    axiosInstance
      .get(`/todo/${todoId}`)
      .then((res) => setTodo(res.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (isMounted.current) return;
    fetchTodo();
    isMounted.current = true;
  }, [todoId]);

  const deleteTodo = () => {
    setLoading(true);
    axiosInstance
      .delete(`/todo/${todoId}`)
      .then(() => {
        toast({
          title: "Todo deleted successfully",
          status: "success",
          isClosable: true,
          duration: 2000,
        });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Couldn't delete todo",
          status: "error",
          isClosable: true,
          duration: 2000,
        });
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <Container mt={6}>
        <Center mt={6}>
          <Spinner
            thickness="6px"
            speed="0.5s"
            emptyColor="gray.200"
            color="gray.500"
            size="lg"
          />
        </Center>
      </Container>
    );
  }

  return (
    <Container
      bg={`linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), ${imageBg}`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      minHeight="7rem"
      my={3}
      p={3}
      rounded="lg"
    >
      {/* Title and Back button */}
      <Flex justify="space-between" align="center">
        <Text fontSize={22} fontWeight="bold">
          {todo.title}
        </Text>
        <CloseButton
          aria-label="Back"
          variant="outline"
          onClick={() => navigate("/", { replace: true })}
          borderRadius="md"
        />
      </Flex>

      {/* Create and Update time */}
      <Box display="flex" alignItems="center" gap={1} mt={2}>
        <Icon as={MdOutlineCreate} boxSize={4} color="grey.200"/>
        <Code variant="outline" fontSize="sm" color="grey.200">
          {new Date(todo.created_at).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Code>
      </Box>

      {todo.created_at !== todo.updated_at && (
        <Box display="flex" alignItems="center" gap={1}>
          <Icon as={MdOutlineUpdate} boxSize={4} color="red.200" />
          <Code variant="outline" fontSize="sm" color="red.200">
            {new Date(todo.updated_at).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Code>
        </Box>
      )}

      {/* Todo description */}
      <Box bg={descriptionBg} mt={3} p={3} rounded="lg">
        <Text height={"450px"} whiteSpace="pre-line">{todo.description}</Text>
      </Box>

      {/* Edit and Delete buttons */}
      <Flex mt={3} width="100%" gap={2}>
        <Box flex="8">
          <AddUpdateTodoModal
            editable={true}
            defaultValues={{
              title: todo.title,
              description: todo.description,
              status: todo.status,
            }}
            onSuccess={fetchTodo}
            width="100%"
          />
        </Box>
        <Box flex="2">
          <IconButton
            isLoading={loading}
            aria-label="Delete Todo"
            icon={<MdDeleteOutline />}
            color="red.200"
            width="100%"
            variant="solid"
            onClick={deleteTodo}
            borderRadius="md"
          />
        </Box>
      </Flex>
    </Container>
  );
};
