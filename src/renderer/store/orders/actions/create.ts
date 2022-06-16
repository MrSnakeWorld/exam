import { AppDispatch } from '../../../store';
import apiAction from '../../../../utils/apiAction';
import IOrder from '../../../../utils/interfaces/IOrder';
import * as types from '../constants';

type ICreateOrderResponse = IOrder[];
export interface ICreateOrderPayload {
  order: IOrder;
}

const request = () => ({ type: types.CREATE_REQUEST });

const success = (orders: ICreateOrderResponse) => ({
  type: types.CREATE_SUCCESS,
  payload: { order: orders[0] } as ICreateOrderPayload,
});

const failure = (err: Error) => ({
  type: types.CREATE_FAILURE,
  payload: { ...err },
});

export const createOrder = (dispatch: AppDispatch, order: IOrder) =>
  apiAction<unknown>(
    dispatch,
    request,
    (req) => success(req),
    failure,
    () => {
      const { userId, productId, orderDate } = order;
      const fields = ['userId', 'productId', 'orderDate'];
      const values = [userId, productId, orderDate];
      console.log({ values });
      return window.api.create('orders', fields, values);
    }
  );
