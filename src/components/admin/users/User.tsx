import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

import { IUser } from './Users';
import RolePopup from './RolePopup';

interface UserProps {
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  user: IUser;
  index: number;
}

const User = ({ setUsers, user, index }: UserProps) => {
  const dateObj = new Date(user.date_created);
  const day = dateObj.getUTCDate().toString().padStart(2, '0');
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getUTCFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return (
    <UserStyle>
      <td>{index}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <RolePopup setUsers={setUsers} user={user} />
      <td>{formattedDate}</td>
    </UserStyle>
  );
};

export default User;

const UserStyle = styled.tr`
  height: 3vh;
  & td {
    border: 1px solid #eeee;
    font-size: 1.1em;
    height: 3vh;
    position: relative;
    text-align: center;
    & td {
      &:nth-child(1) {
        width: 3%;
      }
      &:nth-child(2) {
        width: 30%;
      }
      &:nth-child(3) {
        width: 30%;
      }
      &:nth-child(4) {
        width: 17%;
      }
      &:nth-child(5) {
        width: 20%;
      }
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
