import { ChangeEvent, FormEvent, useState, useRef, Dispatch, SetStateAction } from 'react';
import { ToastContainer } from 'react-toastify';
import axios from '../../../api/axios';
import ReCAPTCHA from 'react-google-recaptcha';

import { ForgotPasswordStyle } from '../../UI/ForgotPassword';
import { Content } from '../../UI/Content.style';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import HeaderForgetPassword from './HeaderForgotPassword';

type ToastStatus = 'success' | 'error';
interface SendOnTimeCodeProps {
  toggle: () => void;
  setForgotPasswordToken: Dispatch<SetStateAction<string>>;
  setTimer: Dispatch<SetStateAction<number>>;
  notify: (status: ToastStatus, message: string) => void;
}

export default function SendOnTimeCode({ toggle, setForgotPasswordToken, setTimer, notify }: SendOnTimeCodeProps) {
  const reRef = useRef<any>();

  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const [isSending, setIsSending] = useState(false);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    let regex = /^\w+@[A-z]+\.[A-z]{2,4}/;
    const errMsg = event.target.value.trim().match(regex) ? '' : 'Enter valid email';
    setErr(errMsg);
  };

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (err === '') {
      const recaptchaToken = await reRef.current?.executeAsync();
      reRef.current?.reset();
      setIsSending(true);
      console.log({ email: email, recaptchaToken });
      try {
        const formData = { email: email, recaptchaToken };
        const response = await axios.post('/users/forgotPassword', formData, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        console.log(response.data);
        setForgotPasswordToken(response.data.forgotPasswordToken);
        setIsSending(false);
        setTimer(300);
        toggle();
      } catch (err: any) {
        console.log('server error', err.response);
        if (!err?.response) {
          notify('error', 'No Server Response');
        } else if (err.response?.status === 400) {
          notify('error', 'Missing Email');
        } else if (err.response?.status === 401) {
          notify('error', 'Email not found');
        } else {
          notify('error', 'Login Failed');
        }
      }
    }
  };

  return (
    <Content>
      <ForgotPasswordStyle onSubmit={onSubmitHandler}>
        <HeaderForgetPassword text='One-Time Code Verification' />
        <Input
          label='Your email'
          icon='fa-solid fa-user'
          errMessage={err}
          input={{
            id: 'email',
            type: 'email',
            placeholder: 'Your email',
            onChange: onChangeHandler,
          }}
        />
        <Button text={isSending ? 'Sending...' : 'send code'} width='60%' />
      </ForgotPasswordStyle>
      <ReCAPTCHA sitekey='6LdJyBEnAAAAAOTY3VksouGPOPVUvDpvMYPXVgmb' size='invisible' ref={reRef} />
      <ToastContainer />
    </Content>
  );
}
