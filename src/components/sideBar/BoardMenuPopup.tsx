import { Dispatch, SetStateAction } from 'react';

import { IBoard, ITeamLeaderBoards } from '../user/account';
import styled from 'styled-components';
import useAxiosPrivate from '../../hooks/useAxiosPrivet';
import useAuth from '../../hooks/useAuth';

interface BoardProps {
  setBoards: Dispatch<SetStateAction<IBoard[] | ITeamLeaderBoards[]>>;
  boardID: string;
  popupRef: React.MutableRefObject<any>;
  toggleIsEdit: () => void;
}

const BoardMenuPopup = ({ boardID, setBoards, popupRef, toggleIsEdit }: BoardProps) => {
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();
  const { auth } = useAuth();

  const deleteBoardHandler = async () => {
    try {
      // setBoards((prevState) => prevState.filter((board) => board._id !== boardID));

      setBoards((prevState) => {
        if (auth.role === 'team_leader') {
          return (prevState as ITeamLeaderBoards[])?.map((boardTeamMember) => {
            const updateBoards = boardTeamMember.boards.filter((board) => board._id !== boardID);
            return { ...boardTeamMember, boards: updateBoards };
          });
        } else {
          return (prevState as IBoard[]).filter((board) => board._id !== boardID);
        }
      });

      await axiosPrivate.delete(`boards/${boardID}`, {
        signal: controller.signal,
      });
    } catch (err: any) {
      console.log('server error', err.response.data);
    }
  };

  return (
    <BoardMenuPopupStyle ref={popupRef}>
      <ul>
        <li onClick={toggleIsEdit}>
          <i className='fa-solid fa-pen'></i>
          <span>Rename Board</span>
        </li>
        <li>
          <i className='fa-solid fa-copy' style={{ opacity: ' 0.5', pointerEvents: 'none' }}></i>
          <span>Duplicate this group</span>
        </li>
        <li>
          <i className='fa-regular fa-circle-up' style={{ opacity: ' 0.5', pointerEvents: 'none' }}></i>
          <span>Move to top</span>
        </li>
      </ul>
      <ul>
        <li>
          <i className='fa-regular fa-file-excel' style={{ opacity: ' 0.5', pointerEvents: 'none' }}></i>
          <span>Export To Excel</span>
        </li>
      </ul>
      <ul>
        <li onClick={deleteBoardHandler}>
          <i className='fa-regular fa-trash-can'></i>
          <span>Delete</span>
        </li>
      </ul>
    </BoardMenuPopupStyle>
  );
};

export default BoardMenuPopup;

const BoardMenuPopupStyle = styled.div`
  position: absolute;
  top: 42px;
  left: 45px;
  width: 12%;
  height: 20vh;
  z-index: 1;
  background: #393e46;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  & ul {
    width: 90%;
    list-style: none;
    padding: 8px 0 8px 0;
    margin: 0;
    border-bottom: 1px solid #eeeeee;
    &:nth-child(3) {
      border-bottom: none;
    }
    & li {
      display: flex;
      cursor: pointer;
      padding: 2px 0;
      & i {
        display: block;
        margin: 0;
      }
      & span {
        margin-left: 4px;
      }
    }
  }
`;
