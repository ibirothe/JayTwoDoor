import {
  Box,
  Center,
  Container,
  Flex,
  Spinner,
  useColorModeValue,
  Select,
  Stack
} from "@chakra-ui/react";
import { useEffect, useRef, useState, useContext } from "react";
import axiosInstance from "../../services/axios";
import { AddUpdateTodoModal } from "./AddUpdateTodoModal";
import { TodoCard } from "./TodoCard";
import { AuthContext } from "../../context/JWTAuthContext";

export const TodoList = () => {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const isMounted = useRef(false);

  // Fetch todos when loaded
  useEffect(() => {
    if (isMounted.current) return;
    fetchTodos(sortBy);
    isMounted.current = true;
  }, []);

  // Refetch when sorting changes
  useEffect(() => {
    if (isMounted.current) {
      fetchTodos(sortBy);
    }
  }, [sortBy]);

  const fetchTodos = (sortBy) => {
    setLoading(true);
    axiosInstance
      .get("/todo/", {
        params: sortBy ? { sort_by: sortBy } : {},
      })
      .then((res) => setTodos(res.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <Flex
      mt={9}
      bg={useColorModeValue(
        "linear-gradient(90deg, #f4e3d8ff, #f6d2d6ff)",
        "linear-gradient(90deg, #1e191aff, #251a28ff)"
      )}
    >
      <Container mt={4}>
        <Stack direction={"row"}>
          <AddUpdateTodoModal onSuccess={() => fetchTodos(sortBy)} user={user} />

          <Select
            rounded="full"
            maxW="100vw"
            bg={useColorModeValue(
              "linear-gradient(90deg, #f6d2d6ff, #f4e3d8ff)",
              "linear-gradient(90deg, #251a28ff, #1e191aff)"
            )}
            variant="outline"
            border="none"
            boxShadow="md"
            _hover={{ boxShadow: "lg" }}
            _focus={{
              border: "none",
              outline: "none",
              boxShadow: "0 0 0 3px #958867ff",
            }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option style={{
              background: useColorModeValue("#f6d2d6", "#1e191a"),
              color: useColorModeValue("#2c2c2c", "#f4e3d8"),
            }} value="newest">Newest first</option>
            <option style={{
              background: useColorModeValue("#f6d2d6", "#1e191a"),
              color: useColorModeValue("#2c2c2c", "#f4e3d8"),
            }} value="oldest">Oldest first</option>
            <option style={{
              background: useColorModeValue("#f6d2d6", "#1e191a"),
              color: useColorModeValue("#2c2c2c", "#f4e3d8"),
            }} value="status">Sort by Status</option>
            <option style={{
              background: useColorModeValue("#f6d2d6", "#1e191a"),
              color: useColorModeValue("#2c2c2c", "#f4e3d8"),
            }} value="assignee">Sort by Assignee</option>
          </Select>
        </Stack>

        {loading ? (
          <Center mt={4}>
            <Spinner
              thickness="6px"
              speed="0.5s"
              emptyColor="gray.200"
              color="gray.500"
              size="lg"
            />
          </Center>
        ) : (
          <Box mt={4}>
            {todos?.map((todo) => (
              <TodoCard todo={todo} key={todo.id} user={user} />
            ))}
          </Box>
        )}
      </Container>
    </Flex>
  );
};
