import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';
import { useLocation, useNavigate } from 'react-router-dom';

import User from './User';
import Loading from '../../Loading';

export interface IUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  date_created: Date;
}

const Users = () => {
  const axiosPrivate = useAxiosPrivate();
  const nav = useNavigate();
  const location = useLocation();

  const [users, setUsers] = useState<IUser[]>([]);
  const [sort, setShort] = useState('');
  const [reverse, setReverse] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  let isMounted = true;
  const controller = new AbortController();
  const getAllUsersHandler = async () => {
    try {
      const response = await axiosPrivate.get(`/users/allUsers/?sort=${sort}&reverse=${reverse}&s=${search}`, {
        signal: controller.signal,
      });
      isMounted && setUsers(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      nav('/login', { state: { from: location }, replace: true });
    }
  };
  useEffect(() => {
    getAllUsersHandler();
  }, [sort, reverse, search]);

  return isLoading ? (
    <Loading />
  ) : (
    <UsersStyle>
      <h2>List of users</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <User key={user?._id} setUsers={setUsers} user={user} index={i} />
          ))}
        </tbody>
      </table>
    </UsersStyle>
  );
};

export default Users;

const UsersStyle = styled.div`
  margin-top: 10vh;
  color: #eeee;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  & h2 {
    width: 80%;
    text-align: center;
  }
  & table {
    width: 80%;
    & thead {
      background: #222831;
      & tr {
        & th {
          text-align: center;
          border: 1px solid #eeee;
          font-size: 1em;
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
  }
`;
