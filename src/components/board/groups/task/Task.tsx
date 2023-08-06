import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { IBoard } from '../../../user/account';
import { ITask } from '../../Board';
import TaskStatus from './TaskStatus';
import TaskName from './TaskName';
import TaskMenuPopup from './TaskMenuPopup';
import Person from './Person';

interface TaskProps {
  board?: IBoard;
  groupID: string;
  task: ITask;
}

const Task = ({ board, groupID, task }: TaskProps) => {
  const targetRef = useRef<any>(null);
  const popupRef = useRef<any>(null);
  const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(event.target) && popupRef.current && !popupRef.current.contains(event.target)) {
        hideTaskMenuHandler();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const openTaskMenuHandler = () => {
    setIsTaskMenuOpen(true);
  };

  const hideTaskMenuHandler = () => {
    setIsTaskMenuOpen(false);
  };

  return (
    <TaskStyle>
      <td>
        <i
          ref={targetRef}
          onClick={openTaskMenuHandler}
          style={{ color: isTaskMenuOpen ? '#eeee' : '' }}
          className='fa-solid fa-ellipsis '
        ></i>
        {isTaskMenuOpen && <TaskMenuPopup groupID={groupID} taskID={task?._id} popupRef={popupRef} taskName={task?.name} />}
      </td>
      <TaskName name={task?.name} groupID={groupID} taskID={task?._id} />
      <Person board={board} groupID={groupID} task={task} />
      <TaskStatus status={task?.status} taskID={task?._id} groupID={groupID} />
      <td></td>
    </TaskStyle>
  );
};

export default Task;

const TaskStyle = styled.tr`
  height: 3vh;
  & td {
    border: 1px solid #eeee;
    font-size: 1.1em;
    padding: 0 0 0 4px;
    height: 3vh;
    position: relative;
    &:nth-child(1) {
      border: none;
      width: 5%;
      background: #393e46;
      color: #393e46;
    }
    &:nth-child(2) {
      width: 30%;
    }
    &:nth-child(3) {
      width: 5%;
      text-align: center;
      padding: 0;
    }
    &:nth-child(4) {
      width: 12%;
      font-size: 1em;
      text-align: center;
      margin: 0;
      position: relative;
      cursor: pointer;
      padding: 0;
    }
    &:nth-child(5) {
      width: 48%;
    }
  }

  &:hover {
    & td {
      &:nth-child(1) {
        color: #eeee;
      }
    }
  }

  @media (max-width: 1300px) {
    & td {
      &:nth-child(4) {
        width: 15%;
      }
      &:nth-child(5) {
        width: 45%;
      }
    }
  }
`;
