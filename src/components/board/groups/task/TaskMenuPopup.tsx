import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivet';

import { IGroup } from '../../Board';

interface TaskMenuPopupProps {
  setGroups: Dispatch<SetStateAction<IGroup[]>>;
  groupID: string;
  taskID: string;
  popupRef: React.MutableRefObject<any>;
  taskName: string;
}

const TaskMenuPopup = ({ setGroups, groupID, taskID, popupRef, taskName }: TaskMenuPopupProps) => {
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();

  const deleteTaskHandler = async () => {
    try {
      setGroups((prevState) => {
        return prevState?.map((group) => {
          if (group?._id === groupID) {
            const newTasks = group?.tasks?.filter((task) => task._id !== taskID);
            return { ...group, tasks: newTasks };
          } else return group;
        });
      });
      const response = await axiosPrivate.delete(`groups/tasks/deleteTask/?groupID=${groupID}&taskID=${taskID}`, {
        signal: controller.signal,
      });
      console.log(response.data);
    } catch (err: any) {
      console.log('server error', err?.response?.data);
    }
  };

  return (
    <TaskMenuPopupStyle ref={popupRef}>
      <ul>
        <li style={{ opacity: ' 0.5', pointerEvents: 'none' }}>
          <i className='fa-solid fa-copy'></i>
          <span>Duplicate this group</span>
        </li>
        <li onClick={() => navigator.clipboard.writeText(taskName)}>
          <i className='fa-solid fa-t'></i>
          <span>Copy Name</span>
        </li>
        <li style={{ opacity: ' 0.5', pointerEvents: 'none' }}>
          <i className='fa-regular fa-circle-up'></i>
          <span>Move to top</span>
        </li>
      </ul>
      <ul>
        <li onClick={deleteTaskHandler}>
          <i className='fa-regular fa-trash-can'></i>
          <span>Delete</span>
        </li>
      </ul>
    </TaskMenuPopupStyle>
  );
};

export default TaskMenuPopup;

const TaskMenuPopupStyle = styled.div`
  position: absolute;
  top: 42px;
  left: 12px;
  width: 10vw;
  height: 15vh;
  z-index: 1;
  background: #222831;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  & ul {
    width: 90%;
    list-style: none;
    padding: 8px 0 8px 0;
    margin: 0;
    border-bottom: 1px solid #eeeeee;
    &:nth-child(2) {
      border-bottom: none;
    }
    & li {
      color: #eeeeee;
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 2px 0;
      font-size: 0.9em;
      & i {
        margin: 0;
      }
      & span {
        margin-left: 4px;
      }
    }
  }
`;
