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
  const [originalGroups, setOriginalGroups] = useState<IGroup[]>([]);
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

  const getCurrBoardHandler = () => {
    if (auth?.role === 'team_leader') {
      for (const member of boards as ITeamLeaderBoards[]) {
        const currBoard = member.boards.find((board) => board?._id === boardID);
        if (currBoard) {
          setBoard(currBoard);
          break;
        }
      }
    } else {
      const currBoard = (boards as IBoard[])?.find((board) => board?._id === boardID);
      if (currBoard) setBoard(currBoard);
    }
  };

  useEffect(() => {
    getGroups();
    getCurrBoardHandler();
  }, [boardID]);

  useEffect(() => {
    getCurrBoardHandler();
  }, [boards]);

  const filterByPersonHandler = async () => {
    if (sorting?.filterByPerson) {
      const updateArr = originalGroups?.reduce((acc: IGroup[], group: IGroup) => {
        const tasksFiltered = group?.tasks?.filter((task) => task?.in_care?.includes(sorting?.filterByPerson));
        if (tasksFiltered?.length > 0) acc.push({ ...group, tasks: tasksFiltered });
        return acc;
      }, []);
      setGroups(updateArr);
    } else setGroups(originalGroups);
  };
  const sortByHandler = async () => {
    if (sorting?.sortBy) {
      const updateArr = [...originalGroups]?.map((group: IGroup) => {
        const sortBy = sorting.sortBy as keyof ITask;
        let sortedTasks: ITask[];
        if (sortBy === 'status') sortedTasks = [...group.tasks].sort((a, b) => (a?.status?.name >= b?.status?.name ? 1 : -1));
        else sortedTasks = [...group.tasks].sort((a, b) => (a?.[sortBy] > b?.[sortBy] ? 1 : -1));

        return { ...group, tasks: sortedTasks };
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
        <Groups
          board={board}
          groups={groups}
          setGroups={setGroups}
          setOriginalGroups={setOriginalGroups}
          showTasksHandler={showTasksHandler}
        />
      </BoardsCenterStyle>
    </BoardsStyle>
  );
};

export default Board;

const BoardsStyle = styled.div`
  width: 84vw;
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
