import { Badge, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const TodoCard = ({ todo }) => {
  const navigate = useNavigate();
  return (
    <Flex
      bg={useColorModeValue(
          "linear-gradient(90deg, #d1a9adff, #cb99abff)",
          "linear-gradient(90deg, #3e3234ff, #36292eff)")}
      minHeight="3rem"
      my={3}
      p={3}
      rounded="lg"
      alignItems="center"
      justifyContent="space-between"
      _hover={{
        opacity: 0.9,
        cursor: "pointer",
        transform: "translateY(-3px)",
      }}
      onClick={() => navigate(`/${todo.todo_id}`, { replace: true })}
    >
      <Text>{todo.title}</Text>
      <Badge colorScheme={todo.status ? "green" : "purple"}>
        {todo.status ? "Complete" : "Pending"}
      </Badge>
    </Flex>
  );
};