import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export interface ITask {
  _id: string;
  name: string;
  in_care: string[];
  status: {
    name: string;
    style: string;
  };

  date_created: Date;
}
export interface IGroup {
  _id: string;
  board_id: string;
  name: string;
  tasks: ITask[];
  is_open: boolean;
  date_created: Date;
}

interface GroupsContext {
  groups: IGroup[];
  setGroups: Dispatch<SetStateAction<IGroup[]>>;
  originalGroups: IGroup[];
  setOriginalGroups: Dispatch<SetStateAction<IGroup[]>>;
}

const GroupsContext = createContext<GroupsContext>({
  groups: [],
  setGroups: () => {},
  originalGroups: [],
  setOriginalGroups: () => {},
});

const GroupsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [originalGroups, setOriginalGroups] = useState<IGroup[]>([]);

  return <GroupsContext.Provider value={{ groups, setGroups, originalGroups, setOriginalGroups }}>{children}</GroupsContext.Provider>;
};

export { GroupsContext, GroupsProvider };
