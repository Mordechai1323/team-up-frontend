import styled from 'styled-components';

import { IBoard } from '../../user/account';

interface HeaderProps {
  board?: IBoard;
}

const Header = ({ board }: HeaderProps) => {
  return (
    <HeaderStyle>
      <h1>{board?.name}</h1>
    </HeaderStyle>
  );
};

export default Header;

const HeaderStyle = styled.div`
  display: flex;
  justify-content: center;
  height: 50%;
  border-bottom: 1px solid #eeeeee;

  & h1 {
    font-size: 1.75em;
    font-weight: 200;
    color: white;
  }
`;
