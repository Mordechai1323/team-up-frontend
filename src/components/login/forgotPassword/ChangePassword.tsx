import { ChangeEvent, FormEvent, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from '../../../api/axios';

import { ForgotPasswordStyle } from '../../UI/ForgotPassword';
import { Content } from '../../UI/Content.style';
import HeaderForgotPassword from './HeaderForgotPassword';
import Input from '../../UI/Input';
import Button from '../../UI/Button';

type ToastStatus = 'success' | 'error';
interface ChangePasswordProps {
  tokenConfirmationCodeVerified: string;
  notify: (status: ToastStatus, message: string) => void;
}

export default function ChangePassword({ tokenConfirmationCodeVerified, notify }: ChangePasswordProps) {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [err, setErr] = useState({
    password: '',
    confirmPassword: '',
  });

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let errMsg = inputErrorHandler(name, value);
    setErr({ ...err, [name]: errMsg });
    setFormData({ ...formData, [name]: value });
  };

  function inputErrorHandler(name: string, value: string) {
    let errMsg = '';
    if (name === 'password') {
      errMsg = value.length >= 6 ? '' : 'Enter valid password(min 6 digit)';
    } else if (name === 'confirmPassword') {
      errMsg = value === formData.password ? '' : `Password  don't match`;
    }

    return errMsg;
  }

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const isErr = err.password !== '' || err.confirmPassword !== '';
    if (!isErr) {
      try {
        const headers = { Authorization: `Bearer ${tokenConfirmationCodeVerified}` };
        await axios.put('/users/editPassword/oneTimeCode', { password: formData.password }, { headers });
        notify('success', 'Your password has been reset');
        nav('/login');
      } catch (err: any) {
        console.log('server error', err.response);
        if (!err?.response) {
          notify('error', 'No Server Response');
        } else {
          notify('error', 'edit password Failed');
        }
      }
    }
  };

  return (
    <Content>
      <ForgotPasswordStyle onSubmit={onSubmitHandler}>
        <HeaderForgotPassword text='Enter new password.' />
        <Input
          label='Password'
          icon='fa-solid fa-lock'
          errMessage={err.password}
          input={{
            id: 'password',
            name: 'password',
            type: 'password',
            placeholder: ' ············',
            onChange: onChangeHandler,
          }}
        />
        <Input
          label='Confirm password'
          icon='fa-solid fa-lock'
          errMessage={err.confirmPassword}
          input={{
            id: 'confirmPassword',
            name: 'confirmPassword',
            type: 'password',
            placeholder: ' ············',
            onChange: onChangeHandler,
          }}
        />
        <Button text={'Submit'} width='60%' />
      </ForgotPasswordStyle>

      <ToastContainer />
    </Content>
  );
}
