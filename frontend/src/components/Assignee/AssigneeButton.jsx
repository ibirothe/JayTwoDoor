import { Icon } from "@chakra-ui/react";
import { MdFace3, MdFace6 } from "react-icons/md";

export default function AssigneeButton({ value = 0, onChange }) {
  const isAssigned = value !== 0;

  return (
    <Icon
      as={isAssigned ? MdFace6 : MdFace3}
      boxSize={6}
      ml={2}
      mt={0}
      cursor="pointer"
      onClick={() => onChange(isAssigned ? 0 : 1)}
      _hover={{ opacity: 0.8, transform: "scale(1.1)" }}
      transition="all 0.2s ease-in-out"
    />
  );
}
