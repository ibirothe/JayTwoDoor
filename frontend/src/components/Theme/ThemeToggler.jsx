import { Flex, FormLabel, Switch, useColorMode } from "@chakra-ui/react";

export const ThemeToggler = ({ showLabel = false, ...rest }) => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Flex align="center" gap={2}>
      <Switch
        id="theme-toggler"
        size="sm"
        isChecked={colorMode === "dark"}
        colorScheme="blue"
        onChange={toggleColorMode}
        {...rest}
      />
      {showLabel && (
        <FormLabel
        htmlFor="theme-toggler"
        mb={0}
        lineHeight="1"
        display="flex"
        alignItems="center"
        fontSize="xs"
        >
          Dark Mode
        </FormLabel>
      )}
    </Flex>
  );
};
