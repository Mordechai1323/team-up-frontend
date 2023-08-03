import styled from 'styled-components';

import UserDetails from './UserDetails';
import MyProfile from './MyProfile';
import CreateTeam from './CreateTeam';
import Administration from './Administration';
import LogOut from './LogOut';
import ChangePassword from './ChangePassword';
import useAuth from '../../../hooks/useAuth';
import MyTeam from './MyTeam';
import DeleteAccount from './DeleteAccount';

interface AccountPopupProps{
  popupRef: any;
  openChangePasswordForm: () => void
  openMyProfileForm: () => void
  openCreateTeamForm: () => void
  openMyTeamForm: () => void
}

const AccountPopup = ({ popupRef, openChangePasswordForm, openMyProfileForm, openCreateTeamForm , openMyTeamForm}: AccountPopupProps) => {
  const { auth } = useAuth();
  return (
    <AccountPopupStyle ref={popupRef}>
      <div className='center'>
        <UserDetails />
        <MyProfile onOpen={openMyProfileForm} />
        <ChangePassword onOpen={openChangePasswordForm} />
        {auth?.role !== 'team_leader' && <CreateTeam onOpen={openCreateTeamForm} />}
        {auth?.role === 'team_leader' && <MyTeam onOpen={openMyTeamForm} />}
        {auth?.role === 'admin' && <Administration />}
        <LogOut />
        <DeleteAccount/>
      </div>
    </AccountPopupStyle>
  );
};

export default AccountPopup;

const AccountPopupStyle = styled.div`
  position: absolute;
  top: 6vh;
  height: 35vh;
  right: 1vw;
  width: 14vw;
  bottom: 0;
  z-index: 1000000;
  background: #393e46;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  border: 1px solid #eeeeee;
  & .center {
    width: 90%;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    & div {
      width: 100%;
    }
  }

  @media (max-width: 1300px) {
    height: 41vh;
  }
`;
