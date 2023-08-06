import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

import { IBoard } from '../../user/account';
import { ISorting } from '../Board';
import Header from './Header';
import Filters from './Filters';

interface TopProps {
  getBoards: () => Promise<void>;
  board?: IBoard;
  sorting: ISorting;
  setSorting: Dispatch<SetStateAction<ISorting>>;
}

const Top = ({ getBoards, board, sorting, setSorting }: TopProps) => {
  return (
    <TopStyle>
      <Header board={board} />
      <Filters getBoards={getBoards} board={board} sorting={sorting} setSorting={setSorting} />
    </TopStyle>
  );
};

export default Top;

const TopStyle = styled.div`
  height: 10vh;
  width: 100%;

  @media (max-width: 1300px) {
    height: 10%;
  }
`;
