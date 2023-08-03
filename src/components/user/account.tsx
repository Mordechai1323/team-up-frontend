import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivet';

import SideBar from '../sideBar/SideBar';
import Board from '../board/Board';
import Loading from '../Loading';
import Header from '../header/Header';
import useAuth from '../../hooks/useAuth';

interface ShareWith {
  _id: string
  user_id: string;
  name: string;
  email: string;
  isOwner: boolean;
}
export interface IBoard {
  _id: string;
  name: string;
  share_with: ShareWith[];
  date_created: Date;
  user_id: string;
}
export interface ITeamLeaderBoards {
  name: string;
  boards: IBoard[];
}

const Account = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const nav = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [boards, setBoards] = useState<IBoard[] | ITeamLeaderBoards[]>([]);
  const [boardID, setBoardID] = useState('');

  const controller = new AbortController();

  const getBoards = async () => {
    console.log('role: ', auth.role);
    if (auth.role === 'team_leader') {
      try {
        const response = await axiosPrivate.get(`/boards/getAllTeamBoards/`, {
          signal: controller.signal,
        });
        console.log(response.data);
        setBoards(response.data);
        setIsLoading(false);
      } catch (err: any) {
        console.log('server error', err.response.data);
        nav('/login', { state: { from: location }, replace: true });
      }
    } else {
      try {
        const response = await axiosPrivate.get(`/boards/getMyBoards/`, {
          signal: controller.signal,
        });
        console.log(response.data);
        setBoards(response.data);
        setIsLoading(false);
      } catch (err: any) {
        console.log('server error', err.response.data);
        nav('/login', { state: { from: location }, replace: true });
      }
    }
  };

  useEffect(() => {
    getBoards();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Header getBoards={getBoards} />
      <SideBar boards={boards} setBoards={setBoards} getBoards={getBoards} boardID={boardID} setBoardID={setBoardID} />
      {boardID && <Board getBoards={getBoards} boards={boards} boardID={boardID} />}
    </>
  );
};

export default Account;
