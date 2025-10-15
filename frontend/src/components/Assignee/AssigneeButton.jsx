import { Icon, useColorModeValue } from "@chakra-ui/react";
import { MdFace, MdFace2, MdFace3, MdFace4, MdFace5, MdFace6 } from "react-icons/md";

const spouse_icons = {
  0: MdFace,
  1: MdFace2,
  2: MdFace3,
  3: MdFace4,
  4: MdFace5,
  5: MdFace6,
};

export default function AssigneeButton({ value , onChange, user }) {
  const assignee = Number(value);

  const spouseAIcon = spouse_icons[user?.spouse_a_icon] || MdFace;
  const spouseBIcon = spouse_icons[user?.spouse_b_icon] || MdFace;

  const isSpouseA = assignee === 0;
  const icon = isSpouseA ? spouseAIcon : spouseBIcon;

  const spouseBColor = useColorModeValue("#3e3234", "#cb99ab");

  return (
    <Icon
      as={icon}
      color={isSpouseA ? "white" : spouseBColor}
      boxSize={6}
      rounded={"full"}
      backgroundColor={useColorModeValue("#958867ff", "#5c5563ff")}
      outline={"2"}
      ml={2}
      mt={0}
      cursor="pointer"
      onClick={() => onChange(isSpouseA ? 1 : 0)}
      _hover={{ opacity: 0.8, transform: "scale(1.3)" }}
      transition="all 0.2s ease-in-out"
    />
  );
}
