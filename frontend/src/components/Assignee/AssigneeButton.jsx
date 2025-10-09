import { Icon } from "@chakra-ui/react";
import { MdFace, MdFace2, MdFace3, MdFace4, MdFace5, MdFace6 } from 'react-icons/md';

const spouse_icons = {
  0: MdFace,
  1: MdFace2,
  2: MdFace3,
  3: MdFace4,
  4: MdFace5,
  5: MdFace6,
};

export default function AssigneeButton({ value, onChange, spouse_a_icon, spouse_b_icon }) {
  // Pick icons dynamically based on database values
  const spouseAIcon = spouse_icons[spouse_a_icon] || MdFace;
  const spouseBIcon = spouse_icons[spouse_b_icon] || MdFace;

  // Choose icon based on current value
  const icon = value === 0 ? spouseAIcon : spouseBIcon;

  // Color: white for the currently assigned, gray for the other
  const color = value === 0 ? "white" : "#958867ff";

  return (
    <Icon
      as={icon}
      color={color}
      boxSize={6}
      ml={2}
      mt={0}
      cursor="pointer"
      onClick={() => onChange(value === 0 ? 1 : 0)}
      _hover={{ opacity: 0.8, transform: "scale(1.1)" }}
      transition="all 0.2s ease-in-out"
    />
  );
}
