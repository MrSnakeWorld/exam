import { AppDispatch } from '../../../store';
import apiAction from '../../../../utils/apiAction';
import IProduct from '../../../../utils/interfaces/IProduct';
import * as types from '../constants';

type ICreateProductResponse = IProduct[];
export interface ICreateProductPayload {
  product: IProduct;
}

const request = () => ({ type: types.CREATE_REQUEST });

const success = (products: ICreateProductResponse) => ({
  type: types.CREATE_SUCCESS,
  payload: { product: products[0] } as ICreateProductPayload,
});

const failure = (err: Error) => ({
  type: types.CREATE_FAILURE,
  payload: { ...err },
});

export const createProduct = (dispatch: AppDispatch, product: IProduct) =>
  apiAction<unknown>(
    dispatch,
    request,
    (req) => success(req),
    failure,
    () => {
      const { name, description, price, typeId } = product;
      const fields = ['name', 'description', 'price', 'typeId'];
      const values = [name, description, price, typeId];

      return window.api.create('products', fields, values);
    }
  );
