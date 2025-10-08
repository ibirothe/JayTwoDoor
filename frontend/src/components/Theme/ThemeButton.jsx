import { Button, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { BsSun, BsMoonStarsFill } from 'react-icons/bs'

export default function ThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Button
    aria-label="Toggle Color Mode"
    onClick={toggleColorMode}
    _focus={{ boxShadow: 'none' }}
    w="fit-content"
    backgroundColor={useColorModeValue("#958867ff", "#5c5563ff")}
    textColor={"#ffffffff"}
    variant="outline"
    rounded="full">
    {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
    </Button>
  )
}