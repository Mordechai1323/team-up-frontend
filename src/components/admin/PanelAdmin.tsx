import styled from 'styled-components';

import { BoardsCenterStyle } from '../UI/BoardsCenter.style';
import Users from './users/Users';


const PanelAdmin = () => {
  return (
    <PanelAdminStyle>
      <SideBarStyle></SideBarStyle>
      <BoardsCenterStyle>
        <Users />
      </BoardsCenterStyle>
    </PanelAdminStyle>
  );
};

export default PanelAdmin;

const PanelAdminStyle = styled.div`
  width: 90vw;
  min-height: 95vh;
  padding-top: 2vh;
  padding-bottom: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1300px) {
    width: 83vw;
  }
`;
const SideBarStyle = styled.div`
  width: 15vw;
  background: #222831;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 2px solid #eeeeee;
`;
