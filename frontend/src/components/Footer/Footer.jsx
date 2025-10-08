import { Container, Stack, Image, Text } from '@chakra-ui/react'
import logo from '../../assets/logo.png'

export const Footer = () => (
  <Container as="footer" height="5vh">
    <Stack direction="row" gap={5} justify="center" align="center" mt={2}>
        <Image src={logo} alt="Logo" height="32px" />
        <Text>© 2025 Jay2Door. All rights reserved.</Text> 
    </Stack>
  </Container>
)