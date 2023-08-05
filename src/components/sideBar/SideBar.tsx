import { useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

import { IBoard, ITeamLeaderBoards } from '../user/account';
import UserDetails from './UserDetails';
import { SideBarCenter } from './SideBarCenter.style';
import Search from './Search';
import AddBoard from './AddBoard';
import Boards from './Boards';
import AddBoardForm from './AddBoardForm';
import useAxiosPrivate from '../../hooks/useAxiosPrivet';
import useAuth from '../../hooks/useAuth';

interface SideBarProps {
  setBoards: Dispatch<SetStateAction<IBoard[] | ITeamLeaderBoards[]>>;
  getBoards: () => Promise<void>;
  boards: IBoard[] | ITeamLeaderBoards[];
  boardID: string;
  setBoardID: Dispatch<SetStateAction<string>>;
}

const SideBar = ({ setBoards, getBoards, boards, boardID, setBoardID }: SideBarProps) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const controller = new AbortController();
  const [isAddBoardOpen, setIsAddBoardOpen] = useState(false);

  const showAddBoardHandler = () => {
    setIsAddBoardOpen(true);
  };

  const hideAddBoardHandler = () => {
    setIsAddBoardOpen(false);
  };

  const onSearchHandler = async (search: string) => {
    try {
      const url = auth.role === 'team_leader' ? `/boards/getAllTeamBoards/?s=${search}` : `/boards/getMyBoards/?s=${search}`;
      const response = await axiosPrivate.get(url, {
        signal: controller.signal,
      });

      setBoards(response.data);
    } catch (err: any) {
      console.log('server error', err.response.data);
    }
  };

  return (
    <SideBarStyle>
      <SideBarCenter>
        <UserDetails />
        <Search onSearchHandler={onSearchHandler} />
        <AddBoard onClick={showAddBoardHandler} />
        {isAddBoardOpen && <AddBoardForm onClose={hideAddBoardHandler} getBoards={getBoards} />}
        <Boards boards={boards} setBoards={setBoards} boardID={boardID} setBoardID={setBoardID} />
      </SideBarCenter>
    </SideBarStyle>
  );
};

export default SideBar;

const SideBarStyle = styled.div`
  width: 15vw;
  margin-top: 5vh;
  background: #222831;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 2px solid #eeeeee;
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 10px;
    height: 15px;
  }

  /* Define the thumb style */
  &::-webkit-scrollbar-thumb {
    background: #fd7014;
    border-radius: 4px;
  }

  /* Define the track style */
  &::-webkit-scrollbar-track:horizontal {
    background-color: white;
    box-shadow: inset 0 0 2px 2px gainsboro;
  }
`;
