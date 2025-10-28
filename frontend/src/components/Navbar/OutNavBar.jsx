import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Icon
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { MdFace3 } from 'react-icons/md';
import headerBgOut from '../../assets/header_out.png';

export const OutNavBar = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        p="1rem"
        bgImage={`linear-gradient(0deg, #00000066, #00000000), url(${headerBgOut})`}
        bgSize="cover"
        bgPos="center"
        bgRepeat="no-repeat"
        >
        <Flex align="center" gap={0}>
            <Icon as={MdFace3} color="white" boxSize={6} mr={1} />
            <Text as="h2" fontSize={24} color={"#cb99ab"} fontWeight="bold">
            JAY
            </Text>
            <Text as="h2" fontSize={24} fontWeight="bold" color="white">
            2Door
            </Text>
        </Flex>

        <Stack direction="row" align="center" spacing={4}>
            <Button onClick={() => navigate(`/login`, { replace: true })}
            backgroundColor={"#5c5563ff"}
            textColor={"#ffffffff"}
            variant="outline"
            rounded="full"
            size={{base:"sm", md:"md"}}>
            Login
            </Button>
        </Stack>
        </Flex>

      <Outlet />
    </Box>
  );
};