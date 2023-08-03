import { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';

import Modal from '../../UI/Modal/Modal';
import InputProject from '../../UI/inputProject';
import Button from '../../UI/Button';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';

interface ChangePasswordFormProps {
  onClose: () => void;
}

const ChangePasswordForm = ({ onClose }: ChangePasswordFormProps) => {
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();
  const [formData, setFormData] = useState({ oldPassword: '', password: '', passwordConfirm: '' });
  const [err, setErr] = useState({ oldPassword: '', password: '', passwordConfirm: '' });

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const errMsg = inputErrorHandler(name, value);
    setErr((prevSate) => {
      return { ...prevSate, [name]: errMsg };
    });
    setFormData((prevSate) => {
      return { ...prevSate, [name]: value };
    });
  };

  const inputErrorHandler = (name: string, value: string) => {
    if (name === 'oldPassword' || name === 'password') {
      return value.length < 6 ? 'Enter valid password(min 6 characters)' : '';
    } else if (name === 'passwordConfirm') {
      return value !== formData.password ? `Password  don't match` : '';
    }
  };

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const isErr = err.oldPassword !== '' || err.password !== '' || err.passwordConfirm !== '';
    if (!isErr) {
      const { passwordConfirm, ...updateFormData } = formData;
      try {
        const response = await axiosPrivate.put(`/users/editPassword`, updateFormData, {
          signal: controller.signal,
        });
        console.log(response.data);
        onClose();
      } catch (err: any) {
        console.log('server error', err.response.data);
      }
    }
  };

  return (
    <Modal onClose={onClose}>
      <ChangePasswordFormStyle onSubmit={onSubmitHandler} onKeyDown={(event) => event.key === 'Enter' && onSubmitHandler(event)}>
        <div className='icon'>
          <i onClick={onClose} className='fa-solid fa-xmark'></i>
        </div>
        <h2>Change password</h2>
        <InputProject
          label={'Old password'}
          type={'password'}
          name='oldPassword'
          onChange={onChangeHandler}
          errMessage={err?.oldPassword}
        />
        <InputProject label={'New password'} type={'password'} name='password' onChange={onChangeHandler} errMessage={err?.password} />
        <InputProject
          label={'Password confirm'}
          type={'password'}
          name='passwordConfirm'
          onChange={onChangeHandler}
          errMessage={err?.passwordConfirm}
        />
        <div className='buttons'>
          <Button onClick={onClose} text='Cancel' width='20%' background='#222831' />
          <Button text='Update' width='25%' background='#FD7014' />
        </div>
      </ChangePasswordFormStyle>
    </Modal>
  );
};

export default ChangePasswordForm;

const ChangePasswordFormStyle = styled.form`
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
    cursor: pointer;
  }
  & h2 {
    width: 100%;
    text-align: center;
    margin: 0;
  }
  & div {
    margin: 0;
    & input {
      /* width: 40%; */
    }
  }
  & .buttons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
  }

  @media (max-width: 1300px) {
    & h2 {
      margin-bottom: 12px;
    }
    & div {
      margin: 8px 0;
    }
  }
`;
