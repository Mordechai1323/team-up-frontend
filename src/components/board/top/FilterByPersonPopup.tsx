import { Dispatch, SetStateAction, MutableRefObject } from 'react';
import styled from 'styled-components';

import { IBoard } from '../../user/account';
import { ISorting } from '../Board';

interface FilterByPersonPopupProps {
  popupRef: MutableRefObject<any>;
  board?: IBoard;
  sorting: ISorting;
  setSorting: Dispatch<SetStateAction<ISorting>>;
}

const FilterByPersonPopup = ({ popupRef, board, sorting, setSorting }: FilterByPersonPopupProps) => {
  const filterByPersonHandler = (userEmail: string) => {
    setSorting((prevSate) => {
      return { ...prevSate, filterByPerson: userEmail };
    });
  };
  const removeFilterByPersonHandler = () => {
    setSorting((prevSate) => {
      return { ...prevSate, filterByPerson: '' };
    });
  };

  return (
    <FilterByPersonPopupStyle ref={popupRef}>
      <ul>
        {board?.share_with?.map((user) => {
          return (
            <li key={user._id}>
              <p onClick={() => filterByPersonHandler(user.email)}> {user?.email}</p>
              {user?.email === sorting?.filterByPerson && <i onClick={removeFilterByPersonHandler} className='fa-solid fa-xmark'></i>}
            </li>
          );
        })}
      </ul>
    </FilterByPersonPopupStyle>
  );
};

export default FilterByPersonPopup;

const FilterByPersonPopupStyle = styled.div`
  position: absolute;
  top: 42px;
  right: 0;
  left: -2vw;
  min-height: 5vh;
  min-width: 10vw;
  background: #222831;
  border-radius: 4px;

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    & li {
      width: 80%;
      height: 15%;
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & p {
        font-size: 1em;
        &:hover {
          background: #d5d8df40;
        }
        cursor: pointer;
      }
      & i {
        font-size: 1em;
        cursor: pointer;
      }
    }
  }
`;
