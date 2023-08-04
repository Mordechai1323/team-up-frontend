import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivet';

import { IGroup } from '../../Board';

interface IStatus {
  name: string;
  style: string;
}

interface TaskStatusProps {
  status: IStatus;
  setGroups: Dispatch<SetStateAction<IGroup[]>>;
  setOriginalGroups: Dispatch<SetStateAction<IGroup[]>>;
  groupID: string;
  taskID: string;
}
interface StatusStyleProps {
  $background: string;
}

const TaskStatus = ({ status, groupID, taskID, setGroups, setOriginalGroups }: TaskStatusProps) => {
  const axiosPrivate = useAxiosPrivate();
  const targetRef = useRef<any>(null);
  const popupRef = useRef<any>(null);

  const controller = new AbortController();

  const optionsArr = [
    { name: 'Working on it', style: 'rgb(253, 188, 100)' },
    { name: 'stuck', style: 'rgb(232, 105, 125)' },
    { name: 'Done', style: 'rgb(51, 211, 145)' },
    { name: '', style: 'rgb(121, 126, 147)' },
  ];
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(event.target) && popupRef.current && !popupRef.current.contains(event.target)) {
        hideOptionHandler();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const openOptionHandler = () => {
    setIsOptionOpen(true);
  };

  const hideOptionHandler = () => {
    setIsOptionOpen(false);
  };

  const updateTaskStatus = (status: IStatus) => {
    const updateStatus = (group: IGroup) => {
      if (group?._id === groupID) {
        const newTasks = group?.tasks?.map((task) => (task?._id === taskID ? { ...task, status } : task));
        return { ...group, tasks: newTasks };
      }
      return group;
    };

    setGroups((prevState) => prevState?.map(updateStatus));
    setOriginalGroups((prevState) => prevState?.map(updateStatus));
  };

  const changeStatusHandler = async (status: IStatus) => {
    try {
      updateTaskStatus(status);
      const url = `groups/tasks/changeStatus/?groupID=${groupID}&taskID=${taskID}`;
      await axiosPrivate.put(url, status, {
        signal: controller.signal,
      });
    } catch (err: any) {
      console.log('server error', err?.response?.data);
    }
  };

  return (
    <TaskStatusStyle>
      <StatusStyle $background={status?.style} ref={targetRef} onClick={openOptionHandler}>
        {status?.name}
      </StatusStyle>
      {isOptionOpen && (
        <div ref={popupRef} className='option'>
          <ul>
            {optionsArr?.map((option) => (
              <li
                key={option?.name}
                style={{ background: option?.style }}
                onClick={() => {
                  hideOptionHandler();
                  changeStatusHandler({ name: option?.name, style: option?.style });
                }}
              >
                {option?.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </TaskStatusStyle>
  );
};

export default TaskStatus;

const TaskStatusStyle = styled.td`
  width: 100%;

  & .option {
    position: absolute;
    top: 42px;
    left: 0;
    right: 0;
    width: 100%;
    height: 18vh;
    z-index: 1;
    text-align: center;
    background: #222831;
    border-radius: 8px;
    & ul {
      height: 100%;
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      & li {
        width: 80%;
        height: 15%;
        /* background: rgb(232, 105, 125); */
        margin-top: 8px;
      }
    }
  }

  @media (max-width: 1300px) {
    & .option {
      height: 28vh;
    }
  }
`;

const StatusStyle = styled.div<StatusStyleProps>`
  width: 100%;
  height: 100%;
  background: ${(props) => props.$background};
`;
