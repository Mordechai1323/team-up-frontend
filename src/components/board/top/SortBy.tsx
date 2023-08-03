import { useEffect, useRef, useState, Dispatch, SetStateAction } from 'react';

import { ISorting } from '../Board';
import SortByPopup from './SortByPopup';
import { InviteStyle } from './Invite';

interface SortByProps {
  icon: string;
  text: string;
  sorting: ISorting;
  setSorting: Dispatch<SetStateAction<ISorting>>;
}

const SortBy = ({ icon, text, sorting, setSorting }: SortByProps) => {
  const targetRef = useRef<any>(null);
  const popupRef = useRef<any>(null);
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(event.target) && popupRef.current && !popupRef.current.contains(event.target)) {
        hideSortPopupHandler();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const openSortPopupHandler = () => {
    setIsSortOpen(true);
  };

  const hideSortPopupHandler = () => {
    setIsSortOpen(false);
  };
  return (
    <InviteStyle onClick={openSortPopupHandler} ref={targetRef}>
      <i className={icon}></i>
      <p>{text}</p>
      {isSortOpen && <SortByPopup popupRef={popupRef} sorting={sorting} setSorting={setSorting} />}
    </InviteStyle>
  );
};

export default SortBy;
