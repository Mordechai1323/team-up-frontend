import { useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

import { IBoard } from '../../user/account';
import { ISorting } from '../Board';
import AddBoard from '../../sideBar/AddBoard';
import Search from '../../sideBar/Search';
import Invite from './Invite';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';
import InviteForm from './InviteForm';
import FilterByPerson from './FilterByPerson';
import SortBy from './SortBy';
import useGroups from '../../../hooks/useGroups';

interface FiltersProps {
  getBoards: () => Promise<void>;
  board?: IBoard;
  sorting: ISorting;
  setSorting: Dispatch<SetStateAction<ISorting>>;
}

const Filters = ({ getBoards, board, sorting, setSorting }: FiltersProps) => {
  const axiosPrivate = useAxiosPrivate();
  const { setGroups, setOriginalGroups } = useGroups();
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const controller = new AbortController();

  const addGroupHandler = async () => {
    try {
      const response = await axiosPrivate.post(`/groups/?boardID=${board?._id}`, {
        signal: controller.signal,
      });
      setGroups((prevState) => [...prevState, response?.data]);
      setOriginalGroups((prevState) => [...prevState, response?.data]);
    } catch (err: any) {
      console.log('server error', err?.response?.data);
    }
  };

  const onSearchHandler = async (search: string) => {
    try {
      const response = await axiosPrivate.get(`/groups/searchGroups/?boardID=${board?._id}&s=${search}`, {
        signal: controller.signal,
      });
      setGroups(response?.data);
    } catch (err: any) {
      console.log('server error', err?.response?.data);
    }
  };

  const showInviteHandler = () => {
    setIsInviteOpen(true);
  };

  const hideInviteHandler = () => {
    setIsInviteOpen(false);
  };

  return (
    <FilterStyle>
      <AddBoard width='8%' text='New group' height='100%' onClick={addGroupHandler} />
      <Search width='10%' onSearchHandler={onSearchHandler} />
      <FilterByPerson icon='fa-solid fa-circle-user' text='Person' board={board} sorting={sorting} setSorting={setSorting} />
      <SortBy icon='fa-solid fa-arrow-down-wide-short' text='Sort' sorting={sorting} setSorting={setSorting} />
      <Invite icon='fa-solid fa-user-plus' text='Invite' onClick={showInviteHandler} />
      {isInviteOpen && <InviteForm onClose={hideInviteHandler} board={board} getBoards={getBoards} />}
    </FilterStyle>
  );
};

export default Filters;

const FilterStyle = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  height: 50%;
  & div {
    margin: 0 4px;
  }
`;
