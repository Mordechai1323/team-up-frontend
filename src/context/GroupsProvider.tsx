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

// import React, { createContext, ReactNode, useReducer } from 'react';

// export interface ITask {
//   _id: string;
//   name: string;
//   in_care: string[];
//   status: {
//     name: string;
//     style: string;
//   };
//   date_created: Date;
// }

// export interface IGroup {
//   _id: string;
//   board_id: string;
//   name: string;
//   tasks: ITask[];
//   is_open: boolean;
//   date_created: Date;
// }

// interface GroupsState {
//   groups: IGroup[];
//   originalGroups: IGroup[];
// }

// interface GroupsAction {
//   type: 'ADD_GROUP' | 'REMOVE_GROUP' | 'UPDATE_GROUPS';
//   groups?: IGroup[];
//   group?: IGroup;
//   groupID?: string;
// }

// const defaultGroupsState: GroupsState = {
//   groups: [],
//   originalGroups: [],
// };

// const groupsReducer = (state: GroupsState, action: GroupsAction): GroupsState => {
//   switch (action.type) {
//     case 'ADD_GROUP':
//       return {
//         ...state,
//         groups: [...state.groups, action.group!],
//         originalGroups: [...state.originalGroups, action.group!],
//       };
//     case 'REMOVE_GROUP':
//       return {
//         ...state,
//         groups: state.groups.filter((group) => group._id !== action.groupID),
//         originalGroups: state.originalGroups.filter((group) => group._id !== action.groupID),
//       };

//     case 'UPDATE_GROUPS':
//       return {
//         ...state,
//         groups: action.groups!,
//       };
//     default:
//       return state;
//   }
// };

// interface GroupsContextType {
//   groups: IGroup[];
//   originalGroups: IGroup[];
//   addGroup: (group: IGroup) => void;
//   removeGroup: (groupID: string) => void;
//   updateGroups: (groups: IGroup[]) => void;
// }

// const GroupsContext = createContext<GroupsContextType>({
//   groups: [],
//   originalGroups: [],
//   addGroup: () => {},
//   removeGroup: () => {},
//   updateGroups: () => {},
// });

// const GroupsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [groupState, dispatchCartAction] = useReducer(groupsReducer, defaultGroupsState);

//   const addGroup = (group: IGroup) => {
//     dispatchCartAction({ type: 'ADD_GROUP', group: group });
//   };

//   const removeGroup = (groupID: string) => {
//     dispatchCartAction({ type: 'REMOVE_GROUP', groupID: groupID });
//   };
//   const updateGroups = (groups: IGroup[]) => {
//     dispatchCartAction({ type: 'UPDATE_GROUPS', groups: groups });
//   };

//   const initiationOrginalGroups = (groups: IGroup[]) => {
//     dispatchCartAction({ type: 'UPDATE_GROUPS', groups: groups });
//   };

//   return (
//     <GroupsContext.Provider
//       value={{ groups: groupState.groups, originalGroups: groupState.originalGroups, addGroup, removeGroup, updateGroups }}
//     >
//       {children}
//     </GroupsContext.Provider>
//   );
// };

// export { GroupsContext, GroupsProvider };
