import { Fragment, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

import { IBoard, ITeamLeaderBoards } from '../user/account';
import Board from './Board';
import useAuth from '../../hooks/useAuth';

interface BoardsProps {
  setBoards: Dispatch<SetStateAction<IBoard[] | ITeamLeaderBoards[]>>;
  boards: IBoard[] | ITeamLeaderBoards[];
  boardID: string;
  setBoardID: Dispatch<SetStateAction<string>>;
}

const Boards = ({ setBoards, boards, boardID, setBoardID }: BoardsProps) => {
  const { auth } = useAuth();
  return (
    <BoardsStyle>
      {boards?.map((board) => {
        if (auth.role === 'team_leader') {
          const teamLeaderBoard = board as ITeamLeaderBoards;
          return (
            <Fragment key={teamLeaderBoard?.name}>
              <h4>{teamLeaderBoard?.name}</h4>
              {teamLeaderBoard?.boards?.map((board) => (
                <Board
                  key={board?._id}
                  board={board}
                  setBoards={setBoards}
                  setBoardID={setBoardID}
                  isCurrentBoard={boardID === board?._id}
                />
              ))}
            </Fragment>
          );
        } else {
          const userBoard = board as IBoard;
          return (
            <Board
              key={userBoard?._id}
              board={userBoard}
              setBoards={setBoards}
              setBoardID={setBoardID}
              isCurrentBoard={boardID === userBoard?._id}
            />
          );
        }
      })}
    </BoardsStyle>
  );
};

export default Boards;

const BoardsStyle = styled.div`
  height: 70vh;
  width: 100%;

  & h4 {
    color: #eeeeee;
    background: #fd711478;
    border-radius: 4px;
  }
`;
