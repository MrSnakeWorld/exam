import {createReducer} from '@reduxjs/toolkit';
import IOrder from '../../../utils/interfaces/IOrder';
import {ICreateOrderPayload} from './actions/create';
import {IReadOrdersPayload} from './actions/read';
import * as types from './constants';

export interface IOrdersState {
  allIds: number[];
  byId: {
    [id: number]: IOrder;
  };
}

export const getInitialState = (): IOrdersState => ({
  allIds: [],
  byId: {},
});

const ordersReducer = createReducer(getInitialState(), {
  [types.CREATE_SUCCESS]: (
    state,
    { payload }: { payload: ICreateOrderPayload }
  ) => {
    const { order } = payload;

    if (order && order.id) {
      state.byId[order.id] = order;
      state.allIds.push(order.id);
    }
  },
  [types.READ_SUCCESS]: (
    state,
    { payload }: { payload: IReadOrdersPayload }
  ) => {
    const { orders } = payload;
    const byId: { [id: number]: IOrder } = {};
    const allIds: number[] = [];

    orders.forEach((order) => {
      byId[order.id] = order;
      allIds.push(order.id);
    });

    state.byId = byId;
    state.allIds = allIds;
  },
});

export default ordersReducer;
