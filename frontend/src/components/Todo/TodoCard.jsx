import { Badge, Flex, Text, useColorModeValue, Icon, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdFace3 } from 'react-icons/md';

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
      <Text fontWeight={"bold"}>{todo.title}</Text>
      <Box display="flex" alignItems="center">
        <Badge colorScheme={todo.status ? "green" : "purple"}>
          {todo.status ? "Complete" : "Pending"}
        </Badge>
        <Icon as={MdFace3} boxSize={6} ml={2} />
      </Box>
    </Flex>
  );
};