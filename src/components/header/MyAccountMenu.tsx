import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';

import AccountPopup from './accountPopup/AccountPopup';
import MyProfileForm from './accountPopup/MyProfileForm';
import ChangePasswordForm from './accountPopup/ChangePasswordForm';
import CreateTeamForm from './accountPopup/CreateTeamForm';
import MyTeamForm from './accountPopup/MyTeamForm';

interface MyAccountMenuProps {
  getBoards: () => Promise<void>;
}


const MyAccountMenu = ({ getBoards }: MyAccountMenuProps) => {
  const targetRef = useRef<any>(null);
  const popupRef = useRef<any>(null);
  const { auth } = useAuth();

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMyProfileFormOpen, setIsMyProfileFormOpen] = useState(false);
  const [isChangePasswordFormOpen, setIsChangePasswordFormOpen] = useState(false);
  const [isCreateTeamFormOpen, setIsCreateTeamFormOpen] = useState(false);
  const [isMyTeamsFormOpen, setIsMyTeamsFormOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(event?.target) && popupRef.current && !popupRef.current.contains(event?.target)) {
        changeIsAccountMenuOpenHandler();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const changeIsAccountMenuOpenHandler = () => {
    setIsAccountMenuOpen((prevState) => !prevState);
  };

  const openMyProfileFormHandler = () => {
    changeIsAccountMenuOpenHandler();
    setIsMyProfileFormOpen(true);
  };

  const closeMyProfileFormHandler = () => {
    setIsMyProfileFormOpen(false);
  };

  const openChangePasswordFormHandler = () => {
    changeIsAccountMenuOpenHandler();
    setIsChangePasswordFormOpen(true);
  };

  const closeChangePasswordFormHandler = () => {
    setIsChangePasswordFormOpen(false);
  };

  const openCreateTeamFormHandler = () => {
    changeIsAccountMenuOpenHandler();
    setIsCreateTeamFormOpen(true);
  };

  const closeCreateTeamFormHandler = () => {
    setIsCreateTeamFormOpen(false);
  };

  const openMyTeamFormHandler = () => {
    changeIsAccountMenuOpenHandler();
    setIsMyTeamsFormOpen(true);
  };

  const closeMyTeamFormHandler = () => {
    setIsMyTeamsFormOpen(false);
  };

  return (
    <MyAccountMenuStyle>
      <img
        onClick={changeIsAccountMenuOpenHandler}
        ref={targetRef}
        src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${auth?.name}`}
        alt=''
      />
      {isAccountMenuOpen && (
        <AccountPopup
          popupRef={popupRef}
          openMyProfileForm={openMyProfileFormHandler}
          openChangePasswordForm={openChangePasswordFormHandler}
          openCreateTeamForm={openCreateTeamFormHandler}
          openMyTeamForm={openMyTeamFormHandler}
        />
      )}
      {isMyProfileFormOpen && <MyProfileForm onClose={closeMyProfileFormHandler} />}
      {isChangePasswordFormOpen && <ChangePasswordForm onClose={closeChangePasswordFormHandler} />}
      {isCreateTeamFormOpen && <CreateTeamForm onClose={closeCreateTeamFormHandler} getBoards={getBoards} />}
      {isMyTeamsFormOpen && <MyTeamForm onClose={closeMyTeamFormHandler} getBoards={getBoards} />}
    </MyAccountMenuStyle>
  );
};

export default MyAccountMenu;

const MyAccountMenuStyle = styled.div`
  width: 5%;
  height: 80%;
  position: relative;

  & img {
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
`;
