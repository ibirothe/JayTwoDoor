import { Icon } from '@chakra-ui/react';
import { MdFace, MdFace2, MdFace3, MdFace4, MdFace5, MdFace6 } from 'react-icons/md';

const spouse_icons = {
  0: MdFace,
  1: MdFace2,
  2: MdFace3,
  3: MdFace4,
  4: MdFace5,
  5: MdFace6,
};

export default function AssigneeDisplay({ assignee, user }) {
  const numericAssignee = Number(assignee);
  const isSpouseA = numericAssignee === 0;

  const spouseAIcon = spouse_icons[user?.spouse_a_icon] || MdFace;
  const spouseBIcon = spouse_icons[user?.spouse_b_icon] || MdFace;

  const icon = isSpouseA ? spouseAIcon : spouseBIcon;

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      <Icon
        as={icon}
        color={isSpouseA ? "white" : "#958867ff"}
        boxSize={6}
      />
    </div>
  );
}
