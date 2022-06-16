import { IState } from '..';

export const getOrdersData = (state: IState) => state.orders;

export const getOrdersAsArray = (state: IState) => {
  const { orders } = state;

  return orders.allIds.map((id) => orders.byId[id]);
};
