import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';

import { IBoard } from '../../user/account';
import { IGroup } from '../Board';

interface GroupMenuPopupProps {
  board?: IBoard;
  setGroups: Dispatch<SetStateAction<IGroup[]>>;
  popupRef: React.MutableRefObject<any>;
  groupID: string;
  onClose: () => void;
}

const GroupMenuPopup = ({ board, setGroups, popupRef, groupID, onClose }: GroupMenuPopupProps) => {
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();

  const addGroupHandler = async () => {
    onClose();
    try {
      const response = await axiosPrivate.post(`/groups/?boardID=${board?._id}`, {
        signal: controller.signal,
      });
      setGroups((prevState) => [...prevState, response?.data]);
    } catch (err: any) {
      console.log('server error', err.response.data);
    }
  };

  const deleteGRoupHandler = async () => {
    try {
      await axiosPrivate.delete(`groups/?groupID=${groupID}`, {
        signal: controller.signal,
      });
      setGroups((prevState) => prevState?.filter((group) => group?._id !== groupID));
    } catch (err: any) {
      console.log('server error', err?.response?.data);
    }
  };

  return (
    <GroupMenuPopupStyle ref={popupRef}>
      <ul>
        <li onClick={addGroupHandler}>
          <i className='fa-solid fa-plus'></i>
          <span>Add group</span>
        </li>
        <li style={{ opacity: ' 0.5', pointerEvents: 'none' }}>
          <i className='fa-solid fa-copy'></i>
          <span> Duplicate this group</span>
        </li>
        <li style={{ opacity: ' 0.5', pointerEvents: 'none' }}>
          <i className='fa-regular fa-circle-up'></i>
          <span>Move to top</span>
        </li>
      </ul>
      <ul>
        <li style={{ opacity: ' 0.5', pointerEvents: 'none' }}>
          <i className='fa-regular fa-file-excel'></i>
          <span>Export To Excel</span>
        </li>
      </ul>
      <ul>
        <li onClick={deleteGRoupHandler}>
          <i className='fa-regular fa-trash-can'></i>
          <span>Delete</span>
        </li>
      </ul>
    </GroupMenuPopupStyle>
  );
};

export default GroupMenuPopup;

const GroupMenuPopupStyle = styled.div`
  position: absolute;
  top: 42px;
  left: 8px;
  width: 10vw;
  height: 21vh;
  z-index: 1;
  background: #222831;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  & ul {
    width: 90%;
    list-style: none;
    padding: 8px 0 8px 0;
    margin: 0;
    border-bottom: 1px solid #eeeeee;
    &:nth-child(3) {
      border-bottom: none;
    }
    & li {
      color: #eeeeee;
      cursor: pointer;
      padding: 2px 0;
      & i {
        margin: 0;
      }
      & span {
        margin-left: 4px;
      }
    }
  }
`;
