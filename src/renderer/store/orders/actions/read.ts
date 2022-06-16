import IOrder from '../../../../utils/interfaces/IOrder';
import apiAction from '../../../../utils/apiAction';
import * as types from '../constants';
import { AppDispatch } from '../..';

type IReadOrdersResponse = IOrder[];
export interface IReadOrdersPayload {
  orders: IOrder[];
}

const request = () => ({ type: types.READ_REQUEST });

const success = (orders: IReadOrdersResponse) => ({
  type: types.READ_SUCCESS,
  payload: { orders } as IReadOrdersPayload,
});

const failure = (err: Error) => ({
  type: types.READ_FAILURE,
  payload: { ...err },
});

const readOrders = (dispatch: AppDispatch) =>
  apiAction<unknown>(
    dispatch,
    request,
    (req) => success(req),
    failure,
    () => {
      return window.api.read('orders');
    }
  );
export default readOrders;
