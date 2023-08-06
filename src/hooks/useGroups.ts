import { useContext } from 'react';
import { GroupsContext } from '../context/GroupsProvider';

const useGroups = () => {
  return useContext(GroupsContext);
};

export default useGroups;
