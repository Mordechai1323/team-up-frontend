import styled from 'styled-components';

import { IBoard } from '../../user/account';
import { IGroup } from '../Board';
import Task from './task/Task';
import AddTask from './task/AddTask';

interface TasksProps {
  board?: IBoard;
  group: IGroup;
}

const Tasks = ({ board, group }: TasksProps) => {
  return (
    <TasksStyle>
      <thead>
        <tr>
          <th></th>
          <th>Task</th>
          <th>Person</th>
          <th>status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {group?.tasks?.map((task) => (
          <Task key={task?._id} board={board} groupID={group?._id} task={task} />
        ))}
        <AddTask groupID={group?._id} />
      </tbody>
    </TasksStyle>
  );
};

export default Tasks;

const TasksStyle = styled.table`
  width: 80%;
 border-collapse: collapse;
  & thead {
    background: #222831;
    & tr {
      & th {
        text-align: center;
        border: 1px solid #eeee;
        font-size: 1em;
        &:nth-child(1) {
          border: none;
          background: #393e46;
          width: 5%;
        }
        &:nth-child(2) {
          width: 30%;
        }
        &:nth-child(3) {
          width: 5%;
        }
        &:nth-child(4) {
          width: 12%;
        }
        &:nth-child(5) {
          width: 48%;
        }
      }
    }
  }

  & tbody {
    background: #222831;
  }
  @media (max-width: 1300px) {
    & thead {
      & tr {
        & th {
          &:nth-child(4) {
            width: 15%;
          }
          &:nth-child(5) {
            width: 45%;
          }
        }
      }
    }
  }
`;
