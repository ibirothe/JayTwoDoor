import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ThemeToggler } from "../Theme/ThemeToggler";

export const NavBar = () => {
  const { logout } = useAuth();
  return (
    <Box minHeight="100vh">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        bgGradient={useColorModeValue(
            "linear(to-r, #d1a9ad, #cb99ab)",
            "linear(to-r, #3e3234, #36292e)"
        )}
        >
        <Flex align="center" gap={0}>
            <Text as="h2" fontSize={24} color={useColorModeValue("#3e3234","#cb99ab")} fontWeight="bold">
            JAY
            </Text>
            <Text as="h2" fontSize={24} fontWeight="bold" color="white">
            2Door
            </Text>
        </Flex>

        <Stack direction="row" align="center" spacing={4}>
            <ThemeToggler size="lg" />
            <Button onClick={logout} colorScheme="purple">
            Logout
            </Button>
        </Stack>
        </Flex>

      <Outlet />
    </Box>
  );
};