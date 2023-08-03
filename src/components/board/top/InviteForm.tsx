import { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';

import { IBoard } from '../../user/account';
import InputProject from '../../UI/inputProject';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal/Modal';

interface InviteFormProps {
  onClose: () => void;
  getBoards: () => Promise<void>;
  board?: IBoard;
}

const InviteForm = ({ getBoards, onClose, board }: InviteFormProps) => {
  const axiosPrivate = useAxiosPrivate();

  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');

  const controller = new AbortController();

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event?.target?.value);
    let regex = /^\w+@[A-z]+\.[A-z]{2,4}/;
    setErr(event?.target?.value?.trim()?.match(regex) ? '' : 'Enter valid email');
  };

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const mewUser = { user_email: email };
      setEmail('');
      await axiosPrivate.post(`/boards/shareBoard/${board?._id}`, mewUser, {
        signal: controller.signal,
      });
      getBoards();
    } catch (err: any) {
      console.log('server error', err.response.data);
    }
  };

  const unshareHandler = async (user_email: string) => {
    try {
      const unshare = { user_email };
      await axiosPrivate.post(`/boards/unshareBoard/${board?._id}`, unshare, {
        signal: controller.signal,
      });
      getBoards();
    } catch (err: any) {
      console.log('server error', err?.response?.data);
    }
  };

  return (
    <Modal onClose={onClose}>
      <InviteFormStyle onSubmit={onSubmitHandler} onKeyDown={(event) => event?.key === 'Enter' && onSubmitHandler(event)}>
        <div className='icon'>
          <i onClick={onClose} className='fa-solid fa-xmark'></i>
        </div>
        <h2>Board Members</h2>
        <InputProject label={'email'} required={true} type={'email'} value={email} onChange={onChangeHandler} errMessage={err} />
        <div className='users-shared'>
          <ul>
            {board?.share_with?.map((user) => (
              <li key={user?._id}>
                <span>{user?.name}</span>
                <span>{user?.email}</span>
                <div className='icons'>
                  <i
                    title={user?.isOwner ? `${user?.name} is owner of this board` : ''}
                    style={{ color: user?.isOwner ? '#FD7014' : '' }}
                    className='fa-solid fa-crown'
                  ></i>
                  {!user?.isOwner && <i onClick={() => unshareHandler(user?.email)} className='fa-solid fa-xmark'></i>}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='buttons'>
          <Button onClick={onClose} text='Cancel' width='20%' background='#222831' />
          <Button text='Invite' width='25%' background='#FD7014' />
        </div>
      </InviteFormStyle>
    </Modal>
  );
};

export default InviteForm;

const InviteFormStyle = styled.form`
  width: 80%;
  height: 55vh;
  color: #eeeeee;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  & .icon {
    width: 100%;
    display: flex;
    justify-content: right;
    & i {
      cursor: pointer;
      font-size: 1.5em;
    }
  }
  & h2 {
    width: 100%;
    text-align: center;
    margin: 0;
  }
  & .buttons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
  }

  & .users-shared {
    width: 100%;
    min-height: 45%;
    margin-top: 5%;
    & ul {
      list-style: none;
      & li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 12px;
        & .icons {
          width: 20%;
          text-align: center;
          & i {
            cursor: pointer;
            padding: 8px 12px;
          }
        }
      }
    }
  }
`;
