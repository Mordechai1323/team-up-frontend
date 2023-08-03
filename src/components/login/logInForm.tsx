import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import { AxiosError } from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { ToastContainer } from 'react-toastify';

import Input from '../UI/Input';
import Button from '../UI/Button';
import CheckBox from './CheckBox';
import Icon from './Icon';
import Form from '../UI/Form';

export interface LogInProps {
  setIsRegistered: (isRegistered: boolean) => void;
  notify: (status: ToastStatus, message: string) => void;
}
type ToastStatus = 'success' | 'error';

export default function LogIn({ setIsRegistered, notify }: LogInProps) {
  const { setAuth } = useAuth();
  const nav = useNavigate();
  const location = useLocation();

  const reRef = useRef<any>(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    recaptchaToken: '',
  });

  const [err, setErr] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let errMsg = inputErrorHandler(name, value);
    setErr({ ...err, [name]: errMsg });
    setFormData({ ...formData, [name]: value });
  };

  function inputErrorHandler(name: string, value: string) {
    let errMsg = '';
    if (name === 'email') {
      let regex = /^\w+@[A-z]+\.[A-z]{2,4}/;
      errMsg = value.trim().match(regex) ? '' : 'Enter valid email';
    } else if (name === 'password') {
      errMsg = value.length >= 6 ? '' : 'Enter valid password(min 6 digit)';
    }

    return errMsg;
  }

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const isErr = err.email !== '' || err.password !== '';

    if (!isErr) {
      formData.recaptchaToken = await reRef.current?.executeAsync();
      reRef.current?.reset();

      try {
        const response = await axios.post('/login', formData, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        setAuth({
          name: response?.data?.name,
          role: response?.data?.role,
          accessToken: response?.data?.accessToken,
        });

        const prevWebPage = location.state?.from?.pathname || '/';
        nav(prevWebPage, { replace: true });
      } catch (err: any) {
        serverErrorHandler(err as AxiosError);
      }
    }
  };

  function serverErrorHandler({ response }: AxiosError) {
    console.log('server error', response);
    const errMsg = !response?.status
      ? 'No Server Response'
      : response.status === 400
      ? 'Missing Email or Password'
      : response.status === 401
      ? 'Email or Password not much'
      : 'Login Failed';
    notify('error', errMsg);
  }

  return (
    <Form onSubmit={onSubmitHandler}>
      <div id='content' className='login-center'>
        <Icon />

        <Input
          label='user name'
          icon='fa-solid fa-user'
          errMessage={err.email}
          input={{
            type: 'email',
            name: 'email',
            placeholder: 'User name',
            id: 'userName',
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

        <Button text='login' width='60%' />
        <CheckBox />
        <div className='footer-container'>
          <Button text='sign up' onClick={() => setIsRegistered(false)} />
          <Link to='/forgotPassword'>Forgot password?</Link>
        </div>
      </div>
      <ReCAPTCHA sitekey='6LdJyBEnAAAAAOTY3VksouGPOPVUvDpvMYPXVgmb' size='invisible' ref={reRef} />
      <ToastContainer />
    </Form>
  );
}
