import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  Icon
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ThemeButton from "../Theme/ThemeButton";
import { UserPropertyModal } from "../Settings/SettingsModal"
import { MdFace3 } from 'react-icons/md';
import headerBgLight from '../../assets/header_light.png';
import headerBgDark from '../../assets/header_dark.png';

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
        backgroundSize={"cover"}
        backgroundImage={useColorModeValue(
                  `url(${headerBgLight})`,
                  `url(${headerBgDark})`
                )}
        >
        <Flex align="center" gap={0}>
            <Icon as={MdFace3} color="white" boxSize={6} mr={1} />
            <Text as="h2" fontSize={24} color={useColorModeValue("#3e3234","#cb99ab")} fontWeight="bold">
            JAY
            </Text>
            <Text as="h2" fontSize={24} fontWeight="bold" color="white">
            2Door
            </Text>
        </Flex>

        <Stack direction="row" align="center" spacing={4}>
            <UserPropertyModal/>
            <ThemeButton size="lg" />
            <Button onClick={logout}
            backgroundColor={useColorModeValue("#958867ff", "#5c5563ff")}
            textColor={"#ffffffff"}
            variant="outline"
            rounded="full">
            Logout
            </Button>
        </Stack>
        </Flex>

      <Outlet />
    </Box>
  );
};