import { useState } from 'react';
import { toast, ToastOptions } from 'react-toastify';

import LoginForm from './logInForm';
import SignUpForm from './signUpForm';

type ToastStatus = 'success' | 'error';

export default function LoginPage() {
  const [isRegistered, setIsRegistered] = useState(true);

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

  return (
    <>
      {isRegistered ? (
        <LoginForm setIsRegistered={setIsRegistered} notify={notify} />
      ) : (
        <SignUpForm setIsRegistered={setIsRegistered} notify={notify} />
      )}
    </>
  );
}
