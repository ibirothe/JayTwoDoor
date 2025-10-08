import { Icon } from '@chakra-ui/react';
import { MdFace3, MdFace6 } from 'react-icons/md';

export default function AssigneeDisplay({ assignee }) {
  const isAssigned = assignee && assignee !== 0;

  return (
    <Icon
      as={isAssigned ? MdFace6 : MdFace3}
      color={"white"}
      boxSize={6}
    />
  );
}
