import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

import { IBoard } from '../../user/account';
import { IGroup } from '../Board';
import GroupOpen from './GroupOpen';
import GroupClose from './GroupClose';

interface GroupProps {
  board?: IBoard;
  group: IGroup;
  setGroups: Dispatch<SetStateAction<IGroup[]>>;
  showTasksHandler: (groupID: string) => Promise<void>
}

const Group = ({ board, setGroups, group, showTasksHandler }: GroupProps) => {
  return (
    <GroupStyle>
      {group?.is_open ? (
        <GroupOpen board={board} group={group} setGroups={setGroups} showTasksHandler={showTasksHandler} />
      ) : (
        <GroupClose board={board} group={group} setGroups={setGroups} showTasksHandler={showTasksHandler} />
      )}
    </GroupStyle>
  );
};

export default Group;

const GroupStyle = styled.div`
  width: 100%;
  color: #eeeeee;
  min-height: 5vh;
  margin: 36px 0;
`;
