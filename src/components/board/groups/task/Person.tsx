import { useEffect, useRef, useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivet';

import { IBoard } from '../../../user/account';
import { IGroup, ITask } from '../../Board';

interface PersonProps {
  board?: IBoard;
  setGroups: Dispatch<SetStateAction<IGroup[]>>;
  setOriginalGroups: Dispatch<SetStateAction<IGroup[]>>;
  groupID: string;
  task: ITask;
}

const Person = ({ board, setGroups, setOriginalGroups, groupID, task }: PersonProps) => {
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();
  const targetRef = useRef<any>(null);
  const popupRef = useRef<any>(null);

  const [isPersonOpen, setIsPersonOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(event.target) && popupRef.current && !popupRef.current.contains(event.target)) {
        hidePersonHandler();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const openPersonHandler = () => {
    setIsPersonOpen(true);
  };

  const hidePersonHandler = () => {
    setIsPersonOpen(false);
  };

  const updateTaskAddInCare = (email: string) => {
    const updateTask = (group: IGroup) => {
      if (group?._id === groupID) {
        const updatedTasks = group?.tasks?.map((item) => {
          if (item?._id === task?._id && !item?.in_care?.includes(email)) {
            return { ...task, in_care: [...task?.in_care, email] };
          }
          return item;
        });
        return { ...group, tasks: updatedTasks };
      }
      return group;
    };
    
    setGroups((prevState) => prevState?.map(updateTask));
    setOriginalGroups((prevState) => prevState?.map(updateTask));
  };

  const addInCareHandler = async (email: string) => {
    try {
      updateTaskAddInCare(email);
      const formData = { user_email: email };
      const url = `groups/tasks/addInCare/?groupID=${groupID}&taskID=${task?._id}`;
      await axiosPrivate.post(url, formData, {
        signal: controller.signal,
      });
    } catch (err: any) {
      console.log('server error', err?.response?.data);
    }
  };

  const updateTaskDeleteInCare = (email: string) => {
    const updateTask = (group: IGroup) => {
      if (group?._id === groupID) {
        const updatedTasks = group?.tasks?.map((item) => {
          if (item?._id === task?._id && item?.in_care?.includes(email)) {
            const updateInCare = item.in_care.filter((in_care) => in_care !== email);
            return { ...item, in_care: updateInCare };
          }
          return item;
        });
        return { ...group, tasks: updatedTasks };
      }
      return group;
    };

    setGroups((prevState) => prevState?.map(updateTask));
    setOriginalGroups((prevState) => prevState?.map(updateTask));
  };

  const deleteInCareHandler = async (email: string) => {
    try {
      updateTaskDeleteInCare(email);
      const formData = { user_email: email };
      const url = `groups/tasks/deleteInCare/?groupID=${groupID}&taskID=${task?._id}`;
      await axiosPrivate.post(url, formData, {
        signal: controller.signal,
      });
    } catch (err: any) {
      console.log('server error', err?.response?.data);
    }
  };

  return (
    <PersonStyle>
      <i ref={targetRef} onClick={openPersonHandler} className='fa-solid fa-circle-user'></i>
      {isPersonOpen && (
        <div ref={popupRef} className='person-popup'>
          <div className='person-exist'>
            <ul>
              {task?.in_care?.map((user) => (
                <li key={user}>
                  {user}
                  <i onClick={() => deleteInCareHandler(user)} className='fa-solid fa-xmark'></i>
                </li>
              ))}
            </ul>
          </div>
          <div className='add-person'></div>
          <div className='list-persons'>
            <span>Suggested people</span>
            <ul>
              {board?.share_with?.map((user) => {
                return (
                  !task?.in_care?.includes(user.email) && (
                    <li onClick={() => addInCareHandler(user?.email)} key={user?._id}>
                      {user?.email}
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </PersonStyle>
  );
};

export default Person;

const PersonStyle = styled.td`
  width: 100%;

  & .person-popup {
    position: absolute;
    top: 42px;
    left: -69px;
    right: 0;
    width: 18vw;
    min-height: 25vh;
    z-index: 1;
    text-align: center;
    background: #222831;
    border-radius: 8px;
    & .person-exist {
      min-height: 8vh;
      & ul {
        min-height: 8vh;
        list-style: none;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
        & li {
          width: 41%;
          background: #eeeeee;
          color: #222831;
          font-size: 0.75em;
          border-radius: 20px;
          padding-left: 2px;
        }
      }
    }
    & .list-persons {
      height: 50%;
      text-align: left;
      & span {
        padding-left: 4px;
        font-size: 1em;
        border-bottom: 1px solid #eeeeee;
        margin-left: 8px;
      }
      & ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        & li {
          width: 80%;
          height: 15%;
          margin-top: 8px;
          cursor: pointer;
          &:hover {
            background: #d5d8df40;
          }
        }
      }
    }
  }

  @media (max-width: 1300px) {
    & .option {
      height: 28vh;
    }
  }
`;
