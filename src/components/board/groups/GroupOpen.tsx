import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { IBoard } from '../../user/account';
import { IGroup } from '../Board';
import Tasks from './Tasks';
import GroupMenuPopup from './GroupMenuPopup';
import GroupName from './GroupName';

interface GroupOpenProps {
  board?: IBoard;
  group: IGroup;
  showTasksHandler: (groupID: string) => Promise<void>;
}

const GroupOpen = ({ board, group, showTasksHandler }: GroupOpenProps) => {
  const targetRef = useRef<any>(null);
  const popupRef = useRef<any>(null);

  const [isGroupMenuOpen, setIsGroupMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(event.target) && popupRef.current && !popupRef.current.contains(event.target)) {
        hideGroupMenuHandler();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const openGroupMenuHandler = () => {
    setIsGroupMenuOpen(true);
  };

  const hideGroupMenuHandler = () => {
    setIsGroupMenuOpen(false);
  };

  return (
    <GroupStyle>
      <div className='setting'>
        <i ref={targetRef} onClick={openGroupMenuHandler} className='fa-solid fa-ellipsis '></i>
        {isGroupMenuOpen && <GroupMenuPopup board={board} groupID={group?._id} popupRef={popupRef} onClose={hideGroupMenuHandler} />}
      </div>

      <i onClick={() => showTasksHandler(group._id)} className='fa-solid fa-chevron-down'></i>
      <GroupName group={group} />
      <Tasks board={board} group={group} />
    </GroupStyle>
  );
};

export default GroupOpen;

const GroupStyle = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  & .setting {
    position: relative;
    color: #393e46;
  }
  & i {
    cursor: pointer;
    margin: 0 12px;
  }

  &:hover {
    & .setting {
      color: #eeeeee;
    }
  }

  & table {
    margin-top: 8px;
    width: 80%;
    background: #393e46;
  }

  @media (max-width: 1300px) {
    & table {
      margin-top: 8px;
      width: 90%;
    }
  }
`;
