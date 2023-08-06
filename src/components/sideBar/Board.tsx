import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

import { IBoard, ITeamLeaderBoards } from '../user/account';
import BoardMenuPopup from './BoardMenuPopup';
import useAxiosPrivate from '../../hooks/useAxiosPrivet';
import useAuth from '../../hooks/useAuth';

interface BoardProps {
  setBoards: Dispatch<SetStateAction<IBoard[] | ITeamLeaderBoards[]>>;
  setBoardID: Dispatch<SetStateAction<string>>;
  board: IBoard;
  isCurrentBoard: boolean;
}
interface BoardStyleProps {
  $isCurrentBoard: boolean;
}

const Board = ({ setBoards, board, setBoardID, isCurrentBoard }: BoardProps) => {
  const targetRef = useRef<any>(null);
  const popupRef = useRef<any>(null);
  const { auth } = useAuth();

  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();

  const [isBoardMenuOpen, setIsBoardMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newBoardName, setNewBoardName] = useState(board?.name);

  const toggleIsEdit = () => {
    hideGroupMenuHandler();
    setIsEdit((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(event.target) && popupRef.current && !popupRef.current.contains(event.target)) {
        hideGroupMenuHandler();
        if (newBoardName !== board.name) RenameBoardHandler();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const RenameBoardHandler = async () => {
    if (newBoardName.trim().length > 0) {
      hideGroupMenuHandler();
      const formData = { name: newBoardName };
      try {
        toggleIsEdit();
        await axiosPrivate.put(`boards/${board._id}`, formData, {
          signal: controller.signal,
        });
        setBoards((prevState) => {
          if (auth.role === 'team_leader') {
            return (prevState as ITeamLeaderBoards[])?.map((teamMemberBoards) => {
              const updateBoards = teamMemberBoards.boards?.map((TeamMemberBoard) => {
                if (TeamMemberBoard._id === board._id) return { ...TeamMemberBoard, name: newBoardName };
                else return TeamMemberBoard;
              });
              return { ...teamMemberBoards, boards: updateBoards };
            });
          } else {
            return (prevState as IBoard[])?.map((boardItem) => {
              if (boardItem._id === board._id) return { ...boardItem, name: newBoardName };
              else return boardItem;
            });
          }
        });
      } catch (err: any) {
        console.log('server error', err.response.data);
      }
    }
  };

  const openGroupMenuHandler = () => {
    setIsBoardMenuOpen(true);
  };

  const hideGroupMenuHandler = () => {
    setIsBoardMenuOpen(false);
  };

  return (
    <BoardStyle $isCurrentBoard={isCurrentBoard}>
      <div onClick={() => !isEdit && setBoardID(board._id)}>
        {isEdit ? (
          <input
            autoFocus
            type='text'
            value={newBoardName}
            onChange={(event) => setNewBoardName(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && RenameBoardHandler()}
            onBlur={RenameBoardHandler}
          />
        ) : (
          newBoardName
        )}
      </div>
      {!isEdit && <i ref={targetRef} onClick={openGroupMenuHandler} className='fa-solid fa-ellipsis'></i>}
      {isBoardMenuOpen && <BoardMenuPopup boardID={board?._id} setBoards={setBoards} popupRef={popupRef} toggleIsEdit={toggleIsEdit} />}
    </BoardStyle>
  );
};

export default Board;

const BoardStyle = styled.div<BoardStyleProps>`
  width: 90%;
  height: 3vh;
  color: #eeeeee;
  margin: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
  background: ${(props) => (props.$isCurrentBoard ? '#fd711478' : '')};
  border-radius: 4px;
  position: relative;

  & input {
    width: 100%;
    background: #222831;
    color: #eeee;
    padding: 0 0 0 8px;
    border: 1px solid #fd711478;
    border-radius: 4px;
    font-size: 0.9em;
    outline: none;
  }

  &:hover {
    background: ${(props) => (props.$isCurrentBoard ? '' : '#d5d8df40')};
    & i {
      display: block;
      cursor: pointer;
    }
  }

  & div {
    width: 90%;
    cursor: pointer;
  }

  & i {
    display: none;
    padding: 0 12px 0 0;
  }

  @media (max-width: 1300px) {
    height: 5vh;
    width: 95%;
  }
`;
