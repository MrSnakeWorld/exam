import { createReducer } from '@reduxjs/toolkit';
import { IUser } from '../../../utils/interfaces/IUser';
import { ICreateUserPayload } from './actions/create';
import { IDeleteUserPayload } from './actions/delete';
import { ILoginUserPayload } from './actions/login';
import { IReadUsersPayload } from './actions/read';
import { IUpdateUserPayload } from './actions/update';
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
  [types.UPDATE_SUCCESS]: (
    state,
    { payload }: { payload: IUpdateUserPayload }
  ) => {
    const { user } = payload;

    if (state.allIds.includes(user.id) && state.byId[user.id]) {
      state.byId[user.id] = user;
    }

    if (state.currentUser && state.currentUser.id === user.id) {
      state.currentUser = user;
    }
  },
  [types.DELETE_SUCCESS]: (
    state,
    { payload }: { payload: IDeleteUserPayload }
  ) => {
    const { id } = payload;

    state.allIds = state.allIds.filter((val) => val !== id);
    delete state.byId[id];
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
