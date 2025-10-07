import { Container, HStack, Icon, Link, Stack } from '@chakra-ui/react'
import { SiGithub, SiX } from 'react-icons/si'
import Logo from '../../assets/logo.png'

export const Footer = () => (
  <Container as="footer" py={{ base: '10', md: '12' }}>
    <Stack gap="6">
      <Stack direction="row" justify="space-between" align="center">
        <Logo height="32" />
        <HStack gap="4">
          {socialLinks.map(({ href, icon }, index) => (
            <Link key={index} href={href} colorPalette="gray">
              <Icon size="md">{icon}</Icon>
            </Link>
          ))}
        </HStack>
      </Stack>
      © 2025 Jay2Door. All rights reserved.
    </Stack>
  </Container>
)

const socialLinks = [
  { href: 'https://x.com', icon: <SiX /> },
  { href: 'https://github.com/ibirothe', icon: <SiGithub /> },
]