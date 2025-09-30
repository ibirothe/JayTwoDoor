import { Badge, Flex, Text, useColorModeValue, Icon, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdFace3 } from 'react-icons/md';
import cardBgLight from '../../assets/card_bg_light.png';
import cardBgDark from '../../assets/card_bg_dark.png';

export const TodoCard = ({ todo }) => {
  const navigate = useNavigate();
  return (
    <Flex
      backgroundImage={useColorModeValue(
                `url(${cardBgLight})`,
                `url(${cardBgDark})`
              )}
      minHeight="3rem"
      my={3}
      p={3}
      rounded="full"
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
        <Badge rounded="full" colorScheme={todo.status ? "green" : "purple"}>
          {todo.status ? "Complete" : "Pending"}
        </Badge>
        <Icon as={MdFace3} boxSize={6} ml={2} />
      </Box>
    </Flex>
  );
};