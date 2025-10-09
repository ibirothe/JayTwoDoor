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
      py={{ base: 16, md: 32 }}
      px={{ base: 4, md: 0 }}
      minH="95vh"
      spacing={{ base: 6, md: 12 }}
      background="linear-gradient(90deg, #1e191aff, #251a28ff)"
    >
      {/* Hero Image */}
      <Flex
        w={{ base: "80%", sm: "60%", md: "450px" }}
        h={{ base: "60vw", sm: "60%", md: "450px" }}
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
          fontSize={{ base: "3xl", md: "6xl", lg: "8xl" }}
          fontWeight="bold"
          lineHeight="none"
          letterSpacing={{ base: "normal", md: "tight" }}
          color="white"
          textAlign="center"
        >
          Shared{" "}
          <Text
            display="inline"
            bgClip="text"
            bgGradient="linear(to-r, #1e191aff, #251a28ff)"
            fontWeight="extrabold"
          >
            Tasks, <br />Lighter Mind
          </Text>
        </Heading>
      </Flex>

      {/* Description */}
      <Flex
        w={{ base: "90%", md: "450px" }}
        align="center"
        justify="center"
      >
        <Text align="center" color="white" fontSize={{ base: "sm", md: "md" }}>
          <b>Jay2Door</b> makes it easier for couples to share the <b>mental load</b>. 
          It’s a todo app built to help spouses manage tasks <b>together</b>.
          This service is dedicated to my wonderful wife - <b>grateful</b> for having her in my 
          life, and for inspiring this project.
        </Text>
      </Flex>

      {/* Call to Action */}
      <Flex
        flexDirection={{ base: "column", sm: "row" }}
        mb={{ base: 4, md: 8 }}
        gap={4}
        align="center"
      >
        <Button
          color="white"
          variant="outline"
          rounded="full"
          size="lg"
          onClick={() => navigate(`/login`, { replace: true })}
        >
          Learn More
        </Button>
        <Button
          bg="#958867ff"
          color="white"
          variant="outline"
          rounded="full"
          size="lg"
          onClick={() => navigate(`/login`, { replace: true })}
        >
          <Icon boxSize={4} mr={3} as={MdFace3} />
          <MirrorText />
          <Icon boxSize={4} ml={3} as={MdFace6} />
        </Button>
      </Flex>
    </Stack>
  );
};
