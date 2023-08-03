import  { useState, useRef, useEffect, Dispatch , SetStateAction} from 'react';
import styled from 'styled-components';

import { IBoard } from '../../user/account';
import { IGroup } from '../Board';
import GroupMenuPopup from './GroupMenuPopup';

interface GroupCloseProps {
  board?: IBoard;
  setGroups: Dispatch<SetStateAction<IGroup[]>>;
  group: IGroup;
  showTasksHandler: (groupID: string) => Promise<void>;
}

const GroupClose = ({ board, setGroups, showTasksHandler, group }: GroupCloseProps) => {
  const targetRef = useRef<any>(null);
  const popupRef = useRef<any>(null);

  const [progressBar, setProgressBar] = useState({
    done: 0,
    workingOnIt: 0,
    stuck: 0,
    notStarted: 0,
  });
  const [tasksLength] = useState(group?.tasks?.length);
  const [isGroupMenuOpen, setIsGroupMenuOpen] = useState(false);

  const checkProgress = () => {
    group.tasks.forEach((task) => {
      if (task.status.name === 'Done') {
        setProgressBar((prevState) => {
          return { ...prevState, done: prevState.done + 1 };
        });
      } else if (task.status.name === 'Working on it') {
        setProgressBar((prevState) => {
          return { ...prevState, workingOnIt: prevState.workingOnIt + 1 };
        });
      } else if (task.status.name === 'stuck') {
        setProgressBar((prevState) => {
          return { ...prevState, stuck: prevState.stuck + 1 };
        });
      } else {
        setProgressBar((prevState) => {
          return { ...prevState, notStarted: prevState.notStarted + 1 };
        });
      }
    });
  };

  useEffect(() => {
    checkProgress();
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
    <GroupCloseStyle>
      <div className='setting'>
        <i ref={targetRef} onClick={openGroupMenuHandler} className='fa-solid fa-ellipsis'></i>
        {isGroupMenuOpen && (
          <GroupMenuPopup board={board} setGroups={setGroups} groupID={group?._id} popupRef={popupRef} onClose={hideGroupMenuHandler} />
        )}
      </div>
      <div className='info'>
        <i onClick={() => showTasksHandler(group._id)} className='fa-solid fa-chevron-right'></i>
        <p>{group?.name}</p>
        {/* <span>{tasks.tasks.length} tasks</span> */}
        <div className='status'>
          <div className='text'>
            <h2>Status</h2>
          </div>
          <div className='status-background'>
            <div className='done' style={{ width: (progressBar.done / tasksLength) * 100 + '%' }}></div>
            <div className='working-on-it' style={{ width: (progressBar.workingOnIt / tasksLength) * 100 + '%' }}></div>
            <div className='stack' style={{ width: (progressBar.stuck / tasksLength) * 100 + '%' }}></div>
            <div className='not-started' style={{ width: (progressBar.notStarted / tasksLength) * 100 + '%' }}></div>
          </div>
        </div>
      </div>
    </GroupCloseStyle>
  );
};

export default GroupClose;

const GroupCloseStyle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 7vh;

  & i {
    cursor: pointer;
    margin: 0 12px;
  }
  & .setting {
    position: relative;
    height: 20%;
    display: flex;
    align-items: center;
    color: #393e46;
  }
  &:hover {
    & i {
      color: #eeeeee;
    }
  }

  & .info {
    width: 80%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background: #222831;
    border-left: 6px solid #eeeeee;
    border-radius: 8px;
    /* padding-top: 8px; */
    & p {
      margin: 0;
      width: 30%;
    }
    & span {
      width: 20%;
      margin-left: 28px;
      font-size: 0.75em;
      color: #eeeeee6a;
    }
    & .status {
      width: 10%;
      height: 100%;
      border-left: 1px solid #eeeeee30;
      border-right: 1px solid #eeeeee30;
      border-radius: 4px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      & .text {
        width: 100%;
        & h2 {
          font-size: 0.9em;
          text-align: center;
          margin: 2px 0 0 0;
        }
      }
      & .status-background {
        width: 80%;
        height: 40%;
        border-radius: 4px;
        display: flex;
        & .done {
          background-color: rgb(51, 211, 145);
          height: 100%;
        }
        & .working-on-it {
          background-color: rgb(253, 188, 100);
          height: 100%;
        }
        & .stack {
          background-color: rgb(232, 105, 125);
          height: 100%;
        }
        & .not-started {
          background-color: rgb(121, 126, 147);
          height: 100%;
        }
      }
    }
  }

  @media (max-width: 1300px) {
    height: 9vh;
  }
`;
