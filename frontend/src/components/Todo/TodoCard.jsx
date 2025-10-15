import { Badge, Flex, Text, useColorModeValue, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import AssigneeDisplay from '../Assignee/AssigneeDisplay';
import cardBgLight from '../../assets/flex_bg_light.png';
import cardBgDark from '../../assets/flex_bg_dark.png';

export const TodoCard = ({ todo, user}) => {
  const navigate = useNavigate();

  const randomYOffset = useMemo(() => {
    const offset = Math.random() * -500;
    return `${offset}px`;
  }, []);


  return (
    <Flex
      backgroundImage={useColorModeValue(
        `url(${cardBgLight})`,
        `url(${cardBgDark})`
      )}
      backgroundPosition={`center ${randomYOffset}`}
      backgroundSize={"cover"}
      minHeight="3rem"
      my={3}
      p={3}
      rounded="full"
      alignItems="center"
      justifyContent="space-between"
      _hover={{
        opacity: 0.9,
        cursor: "pointer",
        transform: "translateY(-2px)",
      }}
      onClick={() => navigate(`/${todo.todo_id}`, { replace: true })}
    >
      <Text fontWeight="bold" textColor="white">{todo.title}</Text>
      <Box display="flex" alignItems="center">
        <Badge rounded="full" colorScheme={todo.status ? "green" : "purple"} mr={2}>
          {todo.status ? "Complete" : "Pending"}
        </Badge>
        <AssigneeDisplay assignee={todo.assignee} user={user} />
      </Box>
    </Flex>
  );
};
