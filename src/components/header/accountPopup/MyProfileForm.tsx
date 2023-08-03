import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';

import Modal from '../../UI/Modal/Modal';
import InputProject from '../../UI/inputProject';
import Button from '../../UI/Button';
import Loading from '../../Loading';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';

interface MyProfileFormProps {
  onClose: () => void;
}
interface MyInfo {
  date_created: string;
  email: string;
  name: string;
  role: string;
  _id: string;
}

const MyProfileForm = ({ onClose }: MyProfileFormProps) => {
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();
  const [isLoading, setIsLoading] = useState(true);
  const [myInfo, setMyInfo] = useState<MyInfo>();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [err, setErr] = useState({ name: '', email: '' });

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
    if (name === 'name') {
      return value.length > 0 && value.length < 2 ? 'Enter valid name(min 2 letters)' : '';
    } else if (name === 'email') {
      let regex = /^\w+@[A-z]+\.[A-z]{2,4}/;
      return value.trim().match(regex) || value.length === 0 ? '' : 'Enter valid email';
    }
  };

  const getMyInfo = async () => {
    try {
      const response = await axiosPrivate.get(`/users/myInfo/`, {
        signal: controller.signal,
      });
      console.log(response.data);
      setMyInfo(response.data);
      setIsLoading(false);
    } catch (err: any) {
      console.log('server error', err.response.data);
    }
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const isErr = err.name !== '' || err.email !== '';
    if (!isErr) {
      const updateInfo = { name: '', email: '' };
      updateInfo.name = formData.name === '' && myInfo?.name ? myInfo?.name : formData?.name;
      updateInfo.email = formData.email === '' && myInfo?.email ? myInfo?.email : formData?.email;
      try {
        const response = await axiosPrivate.put(`/users/`, updateInfo, {
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
      {isLoading ? (
        <Loading height='25vh' width='35vw' />
      ) : (
        <MyProfileFormStyle onSubmit={onSubmitHandler} onKeyDown={(event) => event.key === 'Enter' && onSubmitHandler(event)}>
          <div className='icon'>
            <i onClick={onClose} className='fa-solid fa-xmark'></i>
          </div>
          <h2>My profile</h2>
          <InputProject
            label={'Name'}
            type={'text'}
            name='name'
            onChange={onChangeHandler}
            placeholder={myInfo?.name}
            errMessage={err?.name}
          />
          <InputProject
            label={'Email'}
            type={'email'}
            name='email'
            onChange={onChangeHandler}
            placeholder={myInfo?.email}
            errMessage={err?.email}
          />
          <div className='buttons'>
            <Button onClick={onClose} text='Cancel' width='20%' background='#222831' />
            <Button text='Update' width='25%' background='#FD7014' />
          </div>
        </MyProfileFormStyle>
      )}
    </Modal>
  );
};

export default MyProfileForm;

const MyProfileFormStyle = styled.form`
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
    & div {
      margin: 24px 0;
    }
  }
`;
