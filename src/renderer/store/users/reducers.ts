import { createReducer } from '@reduxjs/toolkit';
import { IUser } from '../../../utils/interfaces/IUser';
import { ICreateUserPayload } from './actions/create';
import { ILoginUserPayload } from './actions/login';
import { IReadUsersPayload } from './actions/read';
import * as types from './constants';

export interface IUsersState {
  allIds: number[];
  byId: {
    [id: number]: IUser;
  };
  currentUser?: IUser;
}

export const getInitialState = (): IUsersState => ({
  allIds: [],
  byId: {},
  currentUser: undefined,
});

const usersReducer = createReducer<IUsersState>(getInitialState(), {
  [types.CREATE_SUCCESS]: (
    state,
    { payload }: { payload: ICreateUserPayload }
  ) => {
    const { user } = payload;

    if (user && user.id) {
      state.byId[user.id] = user;
      state.allIds.push(user.id);
    }
  },
  [types.READ_SUCCESS]: (
    state,
    { payload }: { payload: IReadUsersPayload }
  ) => {
    const { users } = payload;
    const byId: { [id: number]: IUser } = {};
    const allIds: number[] = [];

    users.forEach((user) => {
      byId[user.id] = user;
      allIds.push(user.id);
    });

    state.byId = byId;
    state.allIds = allIds;
  },
  [types.LOGIN]: (state, { payload }: { payload: ILoginUserPayload }) => {
    const { user } = payload;

    if (user && user.id) {
      state.currentUser = user;
    }
  },
  [types.LOGOUT]: (state) => {
    state.currentUser = undefined;
  },
});

export default usersReducer;
