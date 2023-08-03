import { useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivet';

import { IGroup } from '../../Board';

interface AddTaskProps {
  groupID: string;
  setGroups: Dispatch<SetStateAction<IGroup[]>>;
}

const AddTask = ({ groupID, setGroups }: AddTaskProps) => {
  const axiosPrivate = useAxiosPrivate();

  const [task, setTask] = useState('');

  const controller = new AbortController();

  const onSubmitHandler = async () => {
    if (task.trim().length > 0) {
      const formData = { name: task };
      const url = `groups/tasks/addTask/?groupID=${groupID}`;
      setTask('');
      try {
        const response = await axiosPrivate.post(url, formData, {
          signal: controller.signal,
        });
        const newTask = response?.data?.tasks[response?.data?.tasks?.length - 1];
        setGroups((prevState) => {
          return prevState?.map((group) => {
            if (group?._id === groupID) return { ...group, tasks: [...group?.tasks, newTask] };
            else return group;
          });
        });
      } catch (err: any) {
        console.log('server error', err?.response?.data);
      }
    }
  };

  return (
    <TaskStyle>
      <td></td>
      <td>
        <input
          type='text'
          placeholder={'+ Add task'}
          value={task}
          onChange={(event) => setTask(event?.target?.value)}
          onBlur={onSubmitHandler}
          onKeyDown={(event) => event.key === 'Enter' && onSubmitHandler()}
        />
      </td>
    </TaskStyle>
  );
};

export default AddTask;

const TaskStyle = styled.tr`
  height: 100%;
  & td {
    &:nth-child(1) {
      border: none;
      background: #393e46;
      width: 5%;
    }
    border: 1px solid #eeee;
    font-size: 1.1em;
    padding: 0 0 0 4px;
    padding: 2px 0 2px 8px;
    & input {
      width: 90%;
      background: none;
      color: #eeee;
      padding: 0 0 0 8px;
      border: none;
      font-size: 0.9em;
      outline: none;
    }

    &:hover {
      & input {
        border: 1px solid #eeeeee86;
        border-radius: 4px;
      }
    }
  }
`;
