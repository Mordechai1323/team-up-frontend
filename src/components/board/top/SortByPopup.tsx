import { useState, useRef, useEffect, MutableRefObject, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

import { ISorting } from '../Board';

interface SortByPopupProps {
  popupRef: MutableRefObject<any>;
  sorting: ISorting;
  setSorting: Dispatch<SetStateAction<ISorting>>;
}

const SortByPopup = ({ popupRef, sorting, setSorting }: SortByPopupProps) => {
  const targetRef = useRef<any>(null);
  const SortPopupRef = useRef<any>(null);

  const [isSortOptionOpen, setIsSortOptionOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(event.target) && popupRef.current && !popupRef.current.contains(event.target)) {
        hideSortOptionHandler();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const openSortOptionHandler = () => {
    setIsSortOptionOpen(true);
  };

  const hideSortOptionHandler = () => {
    setIsSortOptionOpen(false);
  };

  const changeSortByHandler = (sortBy: string) => {
    setSorting((prevState) => {
      return { ...prevState, sortBy: sortBy };
    });
  };

  return (
    <SortByPopupStyle ref={popupRef}>
      <SortByStyle ref={targetRef} onClick={openSortOptionHandler}>
        {sorting?.sortBy}
        {sorting?.sortBy && <span onClick={() => changeSortByHandler('')}>X</span>}
        <i className='fa-solid fa-chevron-down'></i>
        {isSortOptionOpen && (
          <div ref={SortPopupRef} className='option'>
            <ul>
              <li onClick={() => changeSortByHandler('name')}>Name</li>
              <li onClick={() => changeSortByHandler('date created')}>Date created</li>
              <li onClick={() => changeSortByHandler('status')}>Status</li>
            </ul>
          </div>
        )}
      </SortByStyle>
    </SortByPopupStyle>
  );
};

export default SortByPopup;

const SortByStyle = styled.div`
  position: relative;
  height: 4vh;
  width: 9vw;
  background: #393e46;
  text-align: center;

  top: 3px;
  left: 4px;
  & span {
    padding-left: 8px;
    font-size: 1em;
  }

  & i {
    padding-left: 16px;
    font-size: 1em;
  }
  & .option {
    position: absolute;
    top: 38px;
    left: 0;
    right: 0;
    width: 100%;
    height: 12vh;
    z-index: 1;
    text-align: center;
    background: #222831;
    border-radius: 8px;
    & ul {
      height: 100%;
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      text-align: center;
      & li {
        width: 80%;
        height: 15%;
        /* background: rgb(232, 105, 125); */
        margin-top: 8px;
      }
    }
  }
`;

const SortByPopupStyle = styled.div`
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
