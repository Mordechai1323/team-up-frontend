import styled from 'styled-components';

import { IBoard } from '../../user/account';
import Group from './Group';
import useGroups from '../../../hooks/useGroups';

interface GroupsProps {
  board?: IBoard;
}

const Groups = ({ board }: GroupsProps) => {
  const { groups } = useGroups();
  return (
    <GroupsStyle>
      {groups?.map((group) => (
        <Group key={group._id} board={board} group={group} />
      ))}
    </GroupsStyle>
  );
};

export default Groups;

const GroupsStyle = styled.div`
  width: 100%;
  min-height: 76vh;
  margin-top: 5vh;

  @media (max-width: 1300px) {
    min-height: 71vh;
  }
`;
