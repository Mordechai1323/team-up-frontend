import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

import { IBoard } from '../../user/account';
import { IGroup } from '../Board';
import Group from './Group';

interface GroupsProps {
  board?: IBoard;
  groups: IGroup[];
  setGroups: Dispatch<SetStateAction<IGroup[]>>;
  setOriginalGroups: Dispatch<SetStateAction<IGroup[]>>;
}

const Groups = ({ board, groups, setGroups, setOriginalGroups }: GroupsProps) => {
  return (
    <GroupsStyle>
      {groups?.map((group) => (
        <Group key={group._id} board={board} group={group} setGroups={setGroups} setOriginalGroups={setOriginalGroups} />
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
