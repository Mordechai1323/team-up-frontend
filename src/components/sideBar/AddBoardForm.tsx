import { useState, ChangeEvent, FormEvent } from 'react';

import Modal from '../UI/Modal/Modal';
import styled from 'styled-components';
import InputProject from '../UI/inputProject';
import Button from '../UI/Button';
import useAxiosPrivate from '../../hooks/useAxiosPrivet';

interface AddBoardFormProps {
  onClose: () => void;
  getBoards: () => Promise<void>;
}

const AddBoardForm = ({ onClose, getBoards }: AddBoardFormProps) => {
  const axiosPrivate = useAxiosPrivate();

  const [boardName, setBoardName] = useState('');
  const [err, setErr] = useState('');

  const controller = new AbortController();

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setBoardName(event.target.value);
    setErr(event.target.value.length >= 2 ? '' : 'Enter valid name');
  };

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    onClose();
    try {
      const formDate = { name: boardName };
      const response = await axiosPrivate.post(`/boards/`, formDate, {
        signal: controller.signal,
      });
      console.log(response.data);
      getBoards();
    } catch (err: any) {
      console.log('server error', err.response.data);
    }
  };

  return (
    <Modal onClose={onClose}>
      <AddBoardFormStyle onSubmit={onSubmitHandler} onKeyDown={(event) => event.key === 'Enter' && onSubmitHandler(event)}>
        <div className='icon'>
          <i onClick={onClose} className='fa-solid fa-xmark'></i>
        </div>
        <h2>Create board</h2>
        <InputProject label={'Board Name'} required={true} type={'text'} onChange={onChangeHandler} errMessage={err} />
        <div className='buttons'>
          <Button onClick={onClose} text='Cancel' width='20%' background='#222831' />
          <Button text='Create board' width='25%' background='#FD7014' />
        </div>
      </AddBoardFormStyle>
    </Modal>
  );
};

export default AddBoardForm;

const AddBoardFormStyle = styled.form`
  width: 80%;
  height: 45vh;
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
`;
