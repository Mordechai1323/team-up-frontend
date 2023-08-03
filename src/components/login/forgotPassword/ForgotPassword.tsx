import { useState } from 'react';
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SendOnTimeCode from './SendOnTimeCode';
import VerifyOnTimeCode from './VerifyOnTimeCode';
import ChangePassword from './ChangePassword';

type ToastStatus = 'success' | 'error';

export default function ForgotPassword() {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isVerify, setIsVerify] = useState(false);
  const [forgotPasswordToken, setForgotPasswordToken] = useState('');
  const [tokenConfirmationCodeVerified, setTokenConfirmationCodeVerified] = useState('');

  const toggleISCodeSend = () => {
    setIsCodeSent((prevSate) => !prevSate);
  };

  const toggleIsVerify = () => {
    setIsVerify((prevSate) => !prevSate);
  };

  const notify = (status: ToastStatus, message: string) => {
    const options: ToastOptions = {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    };
    if (status === 'success') toast.success(message, options);
    else toast.error(message, options);
  };

  if (!isVerify && !isCodeSent)
    return (
      <SendOnTimeCode
        toggle={toggleISCodeSend}
        setForgotPasswordToken={setForgotPasswordToken}
        setTimer={setTimer}
        notify={notify}
      />
    );

  if (!isVerify && isCodeSent)
    return (
      <VerifyOnTimeCode
        timer={timer}
        setTimer={setTimer}
        isCodeSent={isCodeSent}
        setIsCodeSent={setIsCodeSent}
        toggle={toggleIsVerify}
        forgotPasswordToken={forgotPasswordToken}
        setTokenConfirmationCodeVerified={setTokenConfirmationCodeVerified}
        notify={notify}
      />
    );

  return <ChangePassword tokenConfirmationCodeVerified={tokenConfirmationCodeVerified} notify={notify} />;
}
