import styled from 'styled-components';
import MyAccountMenu from './MyAccountMenu';

interface HeaderProps {
  getBoards: () => Promise<void>;
}

const Header = ({ getBoards }: HeaderProps) => {
  return (
    <HeaderStyle>
      <MyAccountMenu getBoards={getBoards} />
    </HeaderStyle>
  );
};

export default Header;

const HeaderStyle = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5vh;
  background: #393e46;
  position: fixed;
  display: flex;
  justify-content: right;
  align-items: center;
`;
