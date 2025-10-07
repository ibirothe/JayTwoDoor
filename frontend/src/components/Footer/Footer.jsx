import { Container, HStack, Icon, Link, Stack, Image } from '@chakra-ui/react'
import { SiGithub, SiX } from 'react-icons/si'
import logo from '../../assets/logo.png'

export const Footer = () => (
  <Container as="footer" py={{ base: '10', md: '12' }}>
    <Stack gap="6">
      <Stack direction="row" justify="space-between" align="center">
        <Image src={logo} alt="Logo" height="32px" />
        <HStack gap="4">
          {socialLinks.map(({ href, icon }, index) => (
            <Link key={index} href={href} color="gray.500" isExternal>
              <Icon as={icon} w={5} h={5} />
            </Link>
          ))}
        </HStack>
      </Stack>
      © 2025 Jay2Door. All rights reserved.
    </Stack>
  </Container>
)

const socialLinks = [
  { href: 'https://x.com', icon: SiX },
  { href: 'https://github.com/ibirothe', icon: SiGithub },
]
