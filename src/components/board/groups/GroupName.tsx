import { useState } from 'react';
import styled from 'styled-components';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';

import { IGroup } from '../Board';
import useGroups from '../../../hooks/useGroups';

interface GroupNameProps {
  group: IGroup;
}

const GroupName = ({ group }: GroupNameProps) => {
  const axiosPrivet = useAxiosPrivate();
  const { setGroups } = useGroups();
  const [newName, setNewName] = useState(group?.name);

  const controller = new AbortController();

  const onBlurHandler = async () => {
    try {
      if (newName?.trim()?.length > 0) {
        const name = newName;
        setGroups((prevSate) =>
          prevSate?.map((item) => {
            if (item?._id === group?._id) return { ...item, name };
            return item;
          })
        );
        const formData = { name };
        const url = `groups/?groupID=${group?._id}`;
        await axiosPrivet.put(url, formData, {
          signal: controller.signal,
        });
      }
    } catch (err: any) {
      console.log('server error', err?.response?.data);
    }
  };
  return (
    <GroupNameStyle
      className='group-input'
      type='text'
      value={newName}
      onChange={(event) => setNewName(event?.target?.value)}
      onBlur={onBlurHandler}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onBlurHandler();
          (event?.target as HTMLInputElement)?.blur();
        }
      }}
    />
  );
};

export default GroupName;

const GroupNameStyle = styled.input`
  width: 20%;
  background: none;
  color: #eeee;
  padding: 0 0 0 8px;
  border: none;
  font-size: 0.9em;
  outline: none;

  &:hover {
    border: 1px solid #eeeeee86;
    border-radius: 4px;
  }
`;
