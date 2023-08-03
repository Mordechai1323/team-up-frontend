import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ToastContainer } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

import { LogInProps } from './logInForm';
import Icon from './Icon';
import Input from '../UI/Input';
import Button from '../UI/Button';
import CheckBox from './CheckBox';
import Form from '../UI/Form';

export default function SignUpForm({ setIsRegistered, notify }: LogInProps) {
  const { setAuth } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const reRef = useRef<any>();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    recaptchaToken: '',
  });

  const [err, setErr] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ' ',
  });

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let errMsg = inputErrorHandler(name, value);
    setErr({ ...err, [name]: errMsg });
    setFormData({ ...formData, [name]: value });
  };

  function inputErrorHandler(name: string, value: string) {
    let errMsg = '';
    if (name === 'name') {
      errMsg = value.length >= 2 ? '' : 'Enter valid name(min 2 letters)';
    } else if (name === 'email') {
      let regex = /^\w+@[A-z]+\.[A-z]{2,4}/;
      errMsg = value.trim().match(regex) ? '' : 'Enter valid email';
    } else if (name === 'password') {
      errMsg = value.length >= 6 ? '' : 'Enter valid password(min 6 digit)';
    } else if (name === 'confirmPassword') {
      errMsg = value === formData.password ? '' : `Password  don't match`;
    }

    return errMsg;
  }

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const { confirmPassword, ...updatedFormData } = formData;
    const isErr = err.name !== '' || err.email !== '' || err.password !== '' || err.confirmPassword !== '';
    if (!isErr) {
      updatedFormData.recaptchaToken = await reRef.current?.executeAsync();
      reRef.current?.reset();
      try {
        const response = await axios.post('/register', updatedFormData, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const { name, role } = response.data.user;
        const { accessToken } = response.data;
        setAuth({
          name,
          role,
          accessToken,
        });
        notify('success', 'success');
        const prevWebPage = location.state?.from?.pathname || '/';
        nav(prevWebPage, { replace: true });
      } catch (err: any) {
        serverErrorHandler(err as AxiosError);
      }
    }
  };

  const serverErrorHandler = ({ response }: AxiosError) => {
    console.log(response);
    !response
      ? notify('error', 'No Server Response')
      : response.status === 400
      ? notify('error', 'Missing info')
      : response?.status === 401
      ? notify('error', 'Email already, try login')
      : notify('error', 'Sign up Failed');
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <div id='content' className='login-center'>
        <Icon />

        <Input
          label='Name'
          icon='fa-solid fa-user'
          errMessage={err.name}
          input={{
            type: 'text',
            name: 'name',
            placeholder: 'Name',
            id: 'name',
            onChange: onChangeHandler,
          }}
        />

        <Input
          label='Email'
          icon='fa-solid fa-user'
          errMessage={err.email}
          input={{
            type: 'email',
            name: 'email',
            placeholder: 'Email',
            id: 'Email',
            onChange: onChangeHandler,
          }}
        />
        <Input
          label='Password'
          icon='fa-solid fa-lock'
          errMessage={err.password}
          input={{
            type: 'password',
            name: 'password',
            placeholder: '············',
            id: 'password',
            onChange: onChangeHandler,
          }}
        />
        <Input
          label='Confirm Password'
          icon='fa-solid fa-lock'
          errMessage={err.confirmPassword}
          input={{
            type: 'password',
            name: 'confirmPassword',
            placeholder: '············',
            id: 'confirmPassword',
            onChange: onChangeHandler,
          }}
        />
        <Button type='submit' text='Sign Up' width='60%' />
        <CheckBox />
        <div className='footer-container'>
          <Button text='log in' onClick={() => setIsRegistered(true)} />
        </div>
      </div>
      <ReCAPTCHA sitekey='6LdJyBEnAAAAAOTY3VksouGPOPVUvDpvMYPXVgmb' size='invisible' ref={reRef} />
      <ToastContainer />
    </Form>
  );
}
