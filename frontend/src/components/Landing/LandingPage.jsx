import {
  Button,
  Stack,
  Flex,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdFace3, MdFace6 } from "react-icons/md";
import landingBgLight from "../../assets/landing_light.png";
import MirrorText from "../Text/MirrorText";

export const LandingHero = () => {
    const navigate = useNavigate();
  return (
    <Stack
      align="center"
      py={32}
      height={"95vh"}
      mx="auto"
      spacing={{ base: 4, lg: 8 }}
      background="linear-gradient(90deg, #1e191aff, #251a28ff)"
    >
      <Flex
        width="lg"
        rounded="3xl"
        align="center"
        justify="center"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundImage={`url(${landingBgLight})`}
      >
        <Heading
          mb={6}
          fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}
          fontWeight="bold"
          lineHeight="none"
          letterSpacing={{ base: "normal", md: "tight" }}
          color="white"
        >
          Shared{" "}
          <Text
            display="inline"
            bgClip="text"
            bgGradient="linear(to-r, #1e191aff, #251a28ff)"
            fontWeight="extrabold"
          >
            Tasks, Lighter Mind
          </Text>{" "}
        </Heading>
      </Flex>
      <Flex width="lg"
      align="center"
        justify="center">
        <Text align={"center"} color="white"><b>Jay2Door</b> started with a mispronunciation and a
            simple goal: make it easier for couples to
            share the <b>mental load</b>. It’s a todo app built
            to help spouses manage tasks <b>together</b>, without
            overcomplicating things. The service is dedicated
            to my wife - <b>grateful</b> for having her in
            my life, and for inspiring this project.</Text>
      </Flex>
      <Flex
        flexDirection={{ base: "column", sm: "row" }}
        mb={{ base: 4, md: 8 }}
        gap={4}
      >
        <Button
          backgroundColor={"#958867ff"}
          textColor="#ffffffff"
          variant="outline"
          rounded="full"
          size="lg"
          onClick={() => navigate(`/login`, { replace: true })}
        >
          <Icon boxSize={4} mr={3} as={MdFace3} />
          <MirrorText/>
          <Icon boxSize={4} ml={3} as={MdFace6} />
        </Button>
      </Flex>
    </Stack>
  );
};
