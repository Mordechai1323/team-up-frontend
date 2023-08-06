import { useState } from 'react';
import styled from 'styled-components';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivet';

interface TaskNameProps {
  groupID: string;
  taskID: string;
  name: string;
}

const TaskName = ({ name, groupID, taskID }: TaskNameProps) => {
  const axiosPrivet = useAxiosPrivate();
  const controller = new AbortController();

  const [newName, setNewName] = useState(name);

  const onBlurHandler = async () => {
    if (newName.trim().length > 0) {
      try {
        const url = `groups/tasks/editTask/?groupID=${groupID}&taskID=${taskID}`;
        const formData = { name: newName };
        const response = await axiosPrivet.put(url, formData, {
          signal: controller.signal,
        });
        console.log(response?.data);
      } catch (err: any) {
        console.log('server error', err?.response?.data);
      }
    } else setNewName(name);
  };

  return (
    <TaskNameStyle>
      <input
        type='text'
        value={newName}
        onChange={(event) => setNewName(event?.target?.value)}
        onBlur={onBlurHandler}
        onKeyDown={(event) => {
          if (event?.key === 'Enter') {
            onBlurHandler();
            (event?.target as HTMLInputElement)?.blur();
          }
        }}
      />
    </TaskNameStyle>
  );
};

export default TaskName;

const TaskNameStyle = styled.td`
  & input {
    width: 95%;
    background: none;
    color: #eeee;
    padding: 0 0 0 8px;
    border: none;
    font-size: 0.9em;
    outline: none;
    font-family: 'Open Sans', sans-serif;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }

  &:hover {
    & input {
      border: 1px solid #eeeeee86;
      border-radius: 4px;
    }
  }
`;
