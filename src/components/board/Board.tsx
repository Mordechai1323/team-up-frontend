import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivet';
import styled from 'styled-components';

import { IBoard, ITeamLeaderBoards } from '../user/account';
import { BoardsCenterStyle } from '../UI/BoardsCenter.style';
import Top from './top/Top';
import Groups from './groups/Groups';
import Loading from '../Loading';
import useAuth from '../../hooks/useAuth';

interface BoardProps {
  getBoards: () => Promise<void>;
  boards: IBoard[] | ITeamLeaderBoards[];
  boardID: string;
}
export interface ITask {
  _id: string;
  name: string;
  in_care: string[];
  status: {
    name: string;
    style: string;
  };
  date_created: Date;
}
export interface IGroup {
  _id: string;
  board_id: string;
  name: string;
  tasks: ITask[];
  is_open: boolean;
  date_created: Date;
}
export interface ISorting {
  sortBy: string;
  filterByPerson: string;
}

const Board = ({ getBoards, boardID, boards }: BoardProps) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const nav = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState({ sortBy: '', filterByPerson: '' });
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [originalGroups, setOriginalGroups] = useState([]);
  const [board, setBoard] = useState<IBoard>();

  const controller = new AbortController();

  const showTasksHandler = async (groupID: string) => {
    setGroups(groups.map((group) => (group?._id === groupID ? { ...group, is_open: !group?.is_open } : group)));
    try {
      await axiosPrivate.post(`/groups/changeIsOpen/?groupID=${groupID}`, {
        signal: controller.signal,
      });
    } catch (err: any) {
      console.log('server error', err?.response?.data);
    }
  };

  const getGroups = async () => {
    try {
      const response = await axiosPrivate.get(`/groups/?boardID=${boardID}`, {
        signal: controller.signal,
      });
      setGroups(response?.data);
      setOriginalGroups(response?.data);
      setIsLoading(false);
    } catch (err: any) {
      console.log('server error', err?.response?.data);
      nav('/login', { state: { from: location }, replace: true });
    }
  };

  const getCurrentBoardHandler = () => {
    if (auth?.role === 'team_leader') {
      for (const member of boards as ITeamLeaderBoards[]) {
        const temp = member.boards.find((board) => board._id === boardID);
        if (temp) {
          setBoard(temp);
          break;
        }
      }
    } else {
      const board = (boards as IBoard[])?.find((board) => board?._id === boardID);
      if (board) setBoard(board);
    }
  };

  useEffect(() => {
    getGroups();
    getCurrentBoardHandler();
  }, [boardID]);

  useEffect(() => {
    getCurrentBoardHandler();
  }, [boards]);

  const filterByPersonHandler = async () => {
    if (sorting?.filterByPerson) {
      const updateArr = originalGroups?.reduce((acc: IGroup[], group: IGroup) => {
        const tasksFiltered = group?.tasks?.filter((task: ITask) => task?.in_care?.includes(sorting?.filterByPerson));
        if (tasksFiltered?.length > 0) acc.push({ ...group, tasks: tasksFiltered });
        return acc;
      }, []);
      setGroups(updateArr);
    } else setGroups(originalGroups);
  };
  const sortByHandler = async () => {
    if (sorting?.sortBy) {
      const updateArr = JSON.parse(JSON.stringify(originalGroups))?.map((group: IGroup) => {
        if (sorting?.sortBy === 'name') return { ...group, tasks: group?.tasks?.sort((a, b) => (a?.name > b?.name ? 1 : -1)) };
        if (sorting?.sortBy === 'date created')
          return { ...group, tasks: group?.tasks?.sort((a: ITask, b: ITask) => (a?.date_created > b?.date_created ? 1 : -1)) };
        if (sorting?.sortBy === 'status') return { ...group, tasks: group?.tasks?.sort((a, b) => (a?.status?.name >= b?.status?.name ? 1 : -1)) };
      });
      setGroups(updateArr);
    } else setGroups(originalGroups);
  };
  useEffect(() => {
    filterByPersonHandler();
  }, [sorting.filterByPerson]);
  useEffect(() => {
    sortByHandler();
  }, [sorting.sortBy]);

  return isLoading ? (
    <Loading />
  ) : (
    <BoardsStyle>
      <BoardsCenterStyle>
        <Top board={board} getBoards={getBoards} setGroups={setGroups} sorting={sorting} setSorting={setSorting} />
        <Groups board={board} groups={groups} setGroups={setGroups} showTasksHandler={showTasksHandler} />
      </BoardsCenterStyle>
    </BoardsStyle>
  );
};

export default Board;

const BoardsStyle = styled.div`
  width: 85vw;
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
