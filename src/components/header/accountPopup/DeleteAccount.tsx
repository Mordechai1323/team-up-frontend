import styled from 'styled-components';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();
  const nav = useNavigate();
  const controller = new AbortController();

  const onDeleteAccountHandler = async () => {
    try {
      const response = await axiosPrivate.delete('/users/', {
        signal: controller.signal,
      });
      if (response.data.deletedCount === 1) {
        setAuth({ name: '', role: '', accessToken: '' });
        nav('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DeleteAccountStyle onClick={() => window.confirm('Are you sure?') && onDeleteAccountHandler()}>
      <i className='fa-regular fa-trash-can'></i>
      <span>Delete Account</span>
    </DeleteAccountStyle>
  );
};

export default DeleteAccount;

const DeleteAccountStyle = styled.div`
  color: #eeeeee;
  margin-top: 16px;
  border-radius: 4px;
  cursor: pointer;
  padding-left: 4px;
  & span {
    padding-left: 8px;
  }

  &:hover {
    background: #d5d8df40;
  }
`;
