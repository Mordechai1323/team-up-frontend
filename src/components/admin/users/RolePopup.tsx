import { useEffect, useRef, useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';
import { useNavigate } from 'react-router-dom';

import { IUser } from './Users';

interface RolePopupProps {
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  user: IUser;
}

const RolePopup = ({ setUsers, user }: RolePopupProps) => {
  const axiosPrivate = useAxiosPrivate();
  const nav = useNavigate();
  const targetRef = useRef<any>(null);
  const popupRef = useRef<any>(null);

  const [isRolePopupOpen, setIsRolePopupOpen] = useState(false);
  const optionsArr = ['user', 'team leader', 'admin', 'block'];
  const controller = new AbortController();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(event.target) && popupRef.current && !popupRef.current.contains(event.target)) {
        hideRolePopupHandler();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const openRolePopupHandler = () => {
    setIsRolePopupOpen(true);
  };

  const hideRolePopupHandler = () => {
    setIsRolePopupOpen(false);
  };

  const changeRoleHandler = async (newRole: string, userId: string) => {
    setUsers((prevState) => prevState?.map((userI) => (userI?._id === user?._id ? { ...user, role: newRole } : userI)));
    let url = `/users/changeRole/?user_id=${userId}&role=${newRole}`;
    try {
      await axiosPrivate.patch(url, {
        signal: controller.signal,
      });
    } catch (err: any) {
      if (err.response.status === 401) {
        console.log(err.response.data);
      } else {
        console.error(err);
        nav('/login', { state: { from: location }, replace: true });
      }
    }
  };

  return (
    <RolePopupStyle>
      <RoleStyle ref={targetRef} onClick={openRolePopupHandler}>
        {user?.role}
      </RoleStyle>
      {isRolePopupOpen && (
        <div ref={popupRef} className='option'>
          <ul>
            {optionsArr?.map((option) => (
              <li
                key={option}
                onClick={() => {
                  hideRolePopupHandler();
                  changeRoleHandler(option, user?._id);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </RolePopupStyle>
  );
};

export default RolePopup;

const RolePopupStyle = styled.td`
  cursor: pointer;
  & .option {
    position: absolute;
    top: 42px;
    left: 0;
    right: 0;
    width: 100%;
    height: 18vh;
    z-index: 1;
    text-align: center;
    background: #222831;
    border-radius: 8px;
    & ul {
      height: 100%;
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      & li {
        width: 80%;
        height: 15%;
        margin-top: 8px;
        background: rgb(51, 211, 145);
      }
    }
  }

  @media (max-width: 1300px) {
    & .option {
      height: 28vh;
    }
  }
`;

const RoleStyle = styled.div`
  width: 100%;
  height: 100%;
  background: rgb(51, 211, 145);
`;
