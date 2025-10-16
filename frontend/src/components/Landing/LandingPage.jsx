import { useState, useEffect } from "react";
import {
  Button,
  Stack,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import siteBgLight from "../../assets/landing_bg.png";
import landingBgLight from "../../assets/landing_light.png";
import landingBgReflectionLight from "../../assets/landing_reflection_light.png";
import MirrorText from "../Text/MirrorText";

export const LandingHero = () => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let frameId;
    const speed = 0.04;

    const animate = () => {
      setOffset((prev) => (prev + speed) % 1000);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <Stack
      align="center"
      py={{ base: 12, md: 12 }}
      px={{ base: 4, md: 0 }}
      minH="95vh"
      spacing={{ base: 0, md: 0 }}
      backgroundSize="cover"
      backgroundRepeat="repeat-x"
      backgroundImage={`url(${siteBgLight})`}
      backgroundPosition={`${offset}px center`}
    >
      {/* Hero Image */}
      <Flex
        w={{ base: "80%", sm: "60%", md: "450px" }}
        h={{ base: "60vw", sm: "60%", md: "450px" }}
        roundedTop="3xl"
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
        w={{ base: "80%", sm: "60%", md: "450px" }}
        h={{ base: "50vw", sm: "20%", md: "250px" }}
        align="center"
        justify="center"
        roundedBottom="3xl"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundImage={`url(${landingBgReflectionLight})`}
      >
        <Text ml={6} mr={6} align="center" color="white" fontSize={{ base: "sm", md: "md" }}>
          <b>Jay2Door</b> makes it easier for couples to share the <b>mental load</b>.
          It’s a todo app built to help spouses manage tasks <b>together</b>.
          This service is dedicated to my wonderful wife — <b>grateful</b> for having her in my
          life, and for inspiring me every day.
        </Text>
      </Flex>

      {/* Call to Action */}
      <Flex
        flexDirection={{ base: "column", sm: "row" }}
        mb={{ base: 4, md: 8 }}
        mt={{ base: 4, md: 8 }}
        gap={4}
        align="center"
      >
        <Button
          bg="#958867ff"
          color="white"
          variant="outline"
          rounded="full"
          size={{ base: "md", md: "lg" }}
          onClick={() => navigate(`/register`, { replace: true })}
        >
          <MirrorText />
        </Button>
        <Button
          color="white"
          variant="outline"
          rounded="full"
          size={{ base: "md", md: "lg" }}
          onClick={() => navigate(`/about`, { replace: true })}
        >
          Learn More
        </Button>
      </Flex>
    </Stack>
  );
};
