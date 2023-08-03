import styled from 'styled-components';
import useAuth from '../../../hooks/useAuth';

import useLogout from '../../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  const { setAuth } = useAuth();
  const logout = useLogout();
  const nav = useNavigate();

  const onLogOutHandler = async () => {
    nav('/login');
    await logout();
    setAuth({ name: '', role: '', accessToken: '' });
  };

  return (
    <LogOutStyle onClick={onLogOutHandler}>
      <i className='fa-solid fa-right-from-bracket'></i>
      <span>Log out</span>
    </LogOutStyle>
  );
};

export default LogOut;

const LogOutStyle = styled.div`
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
