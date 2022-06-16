import { createReducer } from '@reduxjs/toolkit';
import IType from '../../../utils/interfaces/IType';
import { ICreateTypePayload } from './actions/create';
import {IDeleteTypePayload} from './actions/delete';
import { IReadTypesPayload } from './actions/read';
import * as types from './constants';

export interface ITypesState {
  allIds: number[];
  byId: {
    [id: number]: IType;
  };
}

export const getInitialState = (): ITypesState => ({
  allIds: [],
  byId: {},
});

const typesReducer = createReducer(getInitialState(), {
  [types.CREATE_SUCCESS]: (
    state,
    { payload }: { payload: ICreateTypePayload }
  ) => {
    const { type } = payload;

    if (type && type.id) {
      state.byId[type.id] = type;
      state.allIds.push(type.id);
    }
  },
  [types.READ_SUCCESS]: (
    state,
    { payload }: { payload: IReadTypesPayload }
  ) => {
    const { types: res } = payload;
    const byId: { [id: number]: IType } = {};
    const allIds: number[] = [];

    res.forEach((type) => {
      byId[type.id] = type;
      allIds.push(type.id);
    });

    state.byId = byId;
    state.allIds = allIds;
  },
  [types.DELETE_SUCCESS]: (
    state,
    { payload }: { payload: IDeleteTypePayload }
  ) => {
    const { id } = payload;

    state.allIds = state.allIds.filter((val) => val !== id);
    delete state.byId[id];
  },
});

export default typesReducer;
