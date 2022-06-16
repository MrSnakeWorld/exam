import IProduct from '../../../../utils/interfaces/IProduct';
import apiAction from '../../../../utils/apiAction';
import * as types from '../constants';
import { AppDispatch } from '../..';

type IReadProductsResponse = IProduct[];
export interface IReadProductsPayload {
  products: IProduct[];
}

const request = () => ({ type: types.READ_REQUEST });

const success = (products: IReadProductsResponse) => ({
  type: types.READ_SUCCESS,
  payload: { products } as IReadProductsPayload,
});

const failure = (err: Error) => ({
  type: types.READ_FAILURE,
  payload: { ...err },
});

const readProducts = (dispatch: AppDispatch) =>
  apiAction<unknown>(
    dispatch,
    request,
    (req) => success(req),
    failure,
    () => {
      return window.api.read('products');
    }
  );
export default readProducts;
