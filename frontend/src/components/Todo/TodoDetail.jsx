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
  HStack,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { MdDeleteOutline, MdOutlineMailOutline } from "react-icons/md";
import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { AddUpdateTodoModal } from "./AddUpdateTodoModal";
import { AuthContext } from "../../context/JWTAuthContext";
import detailBgLight from "../../assets/flex_bg_light.png";
import detailBgDark from "../../assets/flex_bg_dark.png";
import { sendMail } from "../../services/sendMail";
import AssigneeDisplay from "../Assignee/AssigneeDisplay";
import { Confirm } from  "../Confirm/ConfirmBox";
  

export const TodoDetail = () => {
  const [todo, setTodo] = useState({});
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);
  const { todoId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useContext(AuthContext);

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

  const handleSendMail = async () => {
    await sendMail({ todo, user, setLoading, toast });
  };

  /* Confirmation Delete */
  const handleDelete = () => {
    Confirm({
      title: "Deleting 2Door",
      message: "Do you really want to delete this 2Door?",
      okText: 'Confirm',
      confirmColor: 'primary',
      onOk() {
        deleteTodo()
      },
      onCancel() {
      },
    });
  };

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
        <HStack>
          <AssigneeDisplay assignee={todo.assignee} user={user}/>
          <Text fontSize={22} fontWeight="bold" p={todo.urgent&& "xl"} rounded={todo.urgent&& "lg"} backgroundColor={todo.urgent&& "#ff004088"} textColor={todo.urgent&& "#f1ccb3ff"}>{todo.urgent&& "!  "}{todo.title}{todo.urgent&& "  !"}</Text>
        </HStack>
        <CloseButton
          aria-label="Back"
          variant="outline"
          onClick={() => navigate("/", { replace: true })}
          borderRadius="md"
        />
      </Flex>

      {/* Create time */}
      <Box display="flex" alignItems="center" gap={1} mt={2}>
        <Code variant="outline" fontSize="sm" color="grey.200">
          {todo.created_at ? (
            (() => {
              const zone = user.zone || "Europe/Berlin";
              const dt = DateTime.fromISO(todo.created_at, { zone: "utc" }).setZone(zone);
              return `${dt.toFormat("MMMM dd, yyyy HH:mm")}`;
            })()
          ) : (
            "Unknown time"
          )}
        </Code>
      </Box>

      {/* Todo description */}
      <Box bg={descriptionBg} mt={3} p={3} rounded="lg">
        <Text height={"350px"} whiteSpace="pre-line">
          {todo.description}
        </Text>
      </Box>

      {/* Edit, Mail, and Delete buttons */}
      <Flex mt={3} width="100%" gap={2}>
        <Box flex="8">
          <AddUpdateTodoModal
            editable={true}
            defaultValues={{
              title: todo.title,
              description: todo.description,
              status: todo.status,
            }}
            user={user}
            onSuccess={fetchTodo}
            width="100%"
          />
        </Box>
        <Box flex="2">
          <IconButton
            isLoading={loading}
            aria-label="Send Email Reminder"
            icon={<MdOutlineMailOutline />}
            color="black.200"
            width="100%"
            variant="solid"
            onClick={handleSendMail}
            borderRadius="md"
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
            onClick={handleDelete}
            borderRadius="md"
          />
        </Box>
      </Flex>
    </Container>
  );
};