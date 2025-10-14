import { motion } from 'framer-motion';
import { Box, Stack } from '@chakra-ui/react';
const MotionBox = motion(Box);
const MotionSpan = motion('span');

export default function MirrorText({
  textSet = ['Get Started'],
  config = {}
}) {
  return (
    <Stack spacing={2}>
      {textSet.map((text, i) => (
        <FlipLink key={i} text={text} config={config} />
      ))}
    </Stack>
  );
}

const FlipLink = ({ text, config = {} }) => {
  const { duration = 0.25, stagger = 0.025 } = config;

  return (
    <MotionBox
      initial="initial"
      whileHover="hovered"
      position="relative"
      display="block"
      overflow="hidden"
      textDecoration="none"
    >
      <Box>
        {text.split('').map((l, i) => (
          <MotionSpan
            key={i}
            variants={{
              initial: { y: 0 },
              hovered: { y: '-100%' },
            }}
            style={{ display: 'inline-block' }}
            transition={{
              duration: duration,
              ease: 'easeInOut',
              delay: stagger * i,
            }}
          >
            {l}
          </MotionSpan>
        ))}
      </Box>

      <Box position="absolute" inset={0}>
        {text.split('').map((l, i) => (
          <MotionSpan
            key={i}
            variants={{
              initial: { y: '100%' },
              hovered: { y: 0 },
            }}
            style={{ display: 'inline-block' }}
            transition={{
              duration: duration,
              ease: 'easeInOut',
              delay: stagger * i,
            }}
          >
            {l}
          </MotionSpan>
        ))}
      </Box>
    </MotionBox>
  );
};
