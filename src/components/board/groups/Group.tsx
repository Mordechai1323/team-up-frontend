import styled from 'styled-components';

import { IBoard } from '../../user/account';
import { IGroup } from '../Board';
import GroupOpen from './GroupOpen';
import GroupClose from './GroupClose';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';
import useGroups from '../../../hooks/useGroups';

interface GroupProps {
  board?: IBoard;
  group: IGroup;
}

const Group = ({ board, group }: GroupProps) => {
  const axiosPrivate = useAxiosPrivate();
  const { setGroups, setOriginalGroups } = useGroups();
  const controller = new AbortController();

  const updateState = (groupID: string) => {
    const changeIsOpen = (groups: IGroup[]) => {
      return groups.map((group) => (group?._id === groupID ? { ...group, is_open: !group?.is_open } : group));
    };
    setGroups((prevState) => changeIsOpen(prevState));
    setOriginalGroups((prevState) => changeIsOpen(prevState));
  };
  const showTasksHandler = async (groupID: string) => {
    try {
      updateState(groupID);
      await axiosPrivate.post(`/groups/changeIsOpen/?groupID=${groupID}`, {
        signal: controller.signal,
      });
    } catch (err: any) {
      console.log('server error', err?.response?.data);
    }
  };

  return (
    <GroupStyle>
      {group?.is_open ? (
        <GroupOpen
          board={board}
          group={group}
          showTasksHandler={showTasksHandler}
        />
      ) : (
        <GroupClose board={board} group={group}  showTasksHandler={showTasksHandler} />
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
