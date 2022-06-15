import { IState } from '..';

export const getUsersData = (state: IState) => state.users;

export const getUsersAsArray = (state: IState) => {
  const { users } = state;

  return users.allIds.map((id) => users.byId[id]);
};

export const getCurrentUser = (state: IState) => state.users.currentUser;
