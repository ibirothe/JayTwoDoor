import { Container, Icon, Link, Stack, Image, Text } from '@chakra-ui/react'
import { SiGithub } from 'react-icons/si'
import logo from '../../assets/logo.png'

export const Footer = () => (
  <Container as="footer" height="5vh">
    <Stack direction="row" gap={5} justify="center" align="center" mt={2}>
        <Image src={logo} alt="Logo" height="32px" />
        <Text>© 2025 Jay2Door. All rights reserved.</Text> 
        {socialLinks.map(({ href, icon }, index) => (
        <Link key={index} href={href} color="gray.500" isExternal>
            <Icon as={icon} w={5} h={5} />
        </Link>
        ))}
    </Stack>
  </Container>
)

const socialLinks = [
  { href: 'https://github.com/ibirothe', icon: SiGithub },
]
