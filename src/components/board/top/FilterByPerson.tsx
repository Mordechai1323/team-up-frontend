import { useEffect, useRef, useState, Dispatch, SetStateAction } from 'react';

import { IBoard } from '../../user/account';
import { ISorting } from '../Board';
import { InviteStyle } from './Invite';
import FilterByPersonPopup from './FilterByPersonPopup';

interface FilterByPersonProps {
  icon: string;
  text: string;
  board?: IBoard;
  sorting: ISorting;
  setSorting: Dispatch<SetStateAction<ISorting>>;
}

const FilterByPerson = ({ icon, text, board, sorting, setSorting }: FilterByPersonProps) => {
  const targetRef = useRef<any>(null);
  const popupRef = useRef<any>(null);
  const [isFilterByPersonOpen, setIsFilterByPersonOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(event.target) && popupRef.current && !popupRef.current.contains(event.target)) {
        hideFilterByPersonPopupHandler();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const openFilterByPersonPopupHandler = () => {
    setIsFilterByPersonOpen(true);
  };

  const hideFilterByPersonPopupHandler = () => {
    setIsFilterByPersonOpen(false);
  };
  return (
    <InviteStyle onClick={openFilterByPersonPopupHandler} ref={targetRef}>
      <i className={icon}></i>
      <p>{text}</p>
      {isFilterByPersonOpen && <FilterByPersonPopup popupRef={popupRef} board={board} sorting={sorting} setSorting={setSorting} />}
    </InviteStyle>
  );
};

export default FilterByPerson;
