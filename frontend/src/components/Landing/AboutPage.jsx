import {
  chakra,
  Button,
  Stack,
  Text,
  Flex,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import { MdAdd, MdMinimize } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import aboutBg from "../../assets/faq_bg.jpg";
import MirrorText from "../Text/MirrorText";

export const About = () => {
  const navigate = useNavigate();
  const FAQItem = ({ question, answer }) => {
    return (
      <AccordionItem
        bgGradient="linear(to-r, #1e191a99, #251a28BB)"
        borderColor="#251a28ff"
      >
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex="1" textAlign="left" ml={0}>
                <Flex alignItems="center" minH={12}>
                  <Box ml={0}>
                    <chakra.dt
                      fontSize="lg"
                      fontWeight="medium"
                      lineHeight="6"
                      color="white"
                    >
                      {question}
                    </chakra.dt>
                  </Box>
                </Flex>
              </Box>
              {isExpanded ? (
                <MdMinimize
                  fontSize="12px"
                  color="white"
                />
              ) : (
                <MdAdd
                  fontSize="12px"
                  color="white"
                />
              )}
            </AccordionButton>
            <AccordionPanel pb={4}>
              <chakra.dd
                mt={2}
                color="white"
              >
                {answer}
              </chakra.dd>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    );
  };
  return (
    <Stack
      align="center"
      py={{ base: 12, md: 12 }}
      px={{ base: 4, md: 0 }}
      minH="95vh"
      spacing={{ base: 0, md: 0 }}
      background="linear-gradient(90deg, #1e191aff, #251a28ff)"
    >
      <Flex
        w={{ base: "80%", sm: "60%", md: "450px" }}
        rounded="3xl"
        align="center"
        justify="center"
        backgroundSize="cover"
        backgroundPosition="top"
        backgroundRepeat="no-repeat"
        backgroundImage={`url(${aboutBg})`}
      >
        <Box
          py={12}
          rounded="xl"
          shadow="base"
          w="100%"
        >
          <Box
            maxW="7xl"
            mx="auto"
            px={{
              base: 4,
              lg: 8,
            }}
          >
            <Box textAlign="center">
              <chakra.h2
                mt={2}
                fontSize={{
                  base: "3xl",
                  sm: "4xl",
                }}
                lineHeight="8"
                fontWeight="extrabold"
                letterSpacing="tight"
                color="white"
              >
                About{" "}
                <Text
                  display="inline"
                  letterSpacing="tight"
                  bgClip="text"
                  bgGradient="linear(to-r, #deb3c3ff, #e5e2e5ff)"
                  fontWeight="extrabold"
                >
                  JAY2DOOR
                </Text>
              </chakra.h2>
            </Box>

            <Box mt={10}>
              <Accordion allowMultiple>
                <FAQItem
                  question="What is Jay2Door?"
                  answer="Jay2Door is a shared to-do app for partners, families, or roommates who want to handle daily life together - clearly, kindly, and without the mental load falling on one person."
                />
                <FAQItem
                  question="How do we use it?"
                  answer="Add a task, set who’s handling it, and check things off as you go. It’s an easy way to stay on the same page about groceries, chores, and plans - no reminders that sound like nagging."
                />
                <FAQItem
                  question="Can we customize our profile?"
                  answer="Absolutely. You can change your name, icon, and color to match your style. Jay2Door is about real people - no labels, just personalities sharing a life."
                />
                <FAQItem
                  question="How does Jay2Door protect our privacy?"
                  answer="Your lists and data are private and encrypted. Only the people you share your space with can see your tasks. We believe shared life should feel safe - online and off."
                />
                <FAQItem
                  question="Can Jay2Door send reminders?"
                  answer="Yes. You can send email notifications to the assignee for important or time-sensitive tasks. It’s a gentle nudge - never a guilt trip - to help things get done without extra talk. Make sure to complete your profile to ensure all email adresses are available."
                />
              </Accordion>
            </Box>
          </Box>
        </Box>
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
          onClick={() => navigate(`/back`, { replace: true })}
        >
          Back
        </Button>
      </Flex>
    </Stack>
  );
};
