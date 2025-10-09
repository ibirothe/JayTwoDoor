import { Box, Center, Container, Flex, Spinner, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../services/axios";
import { AddUpdateTodoModal } from "./AddUpdateTodoModal";
import { TodoCard } from "./TodoCard";
import { useContext } from "react";
import { AuthContext } from "../../context/JWTAuthContext";

export const TodoList = () => {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    fetchTodos();
    isMounted.current = true;
  }, []);

  const fetchTodos = () => {
    setLoading(true);
    axiosInstance
      .get("/todo/")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Flex mt={9}
    bg={useColorModeValue(
        "linear-gradient(90deg, #f4e3d8ff, #f6d2d6ff)",
        "linear-gradient(90deg, #1e191aff, #251a28ff)"
      )}>
        <Container mt={4}>
            <AddUpdateTodoModal onSuccess={fetchTodos} user={user} />
            {loading ? (
                <Center mt={6}>
                    <Spinner
                        thickness="6px"
                        speed="0.5s"
                        emptyColor="gray.200"
                        color="gray.500"
                        size="lg"
                    />
                </Center>
            ) : (
                <Box mt={6}>
                {todos?.map((todo) => (
                    <TodoCard todo={todo} key={todo.id} user={user}/>
                ))}
                </Box>
            )}
        </Container>
    </Flex>
  );
};