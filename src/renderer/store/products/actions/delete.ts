import { AppDispatch } from '../../../store';
import apiAction from '../../../../utils/apiAction';
import * as types from '../constants';

type IDeleteProductResponse = number;
export interface IDeleteProductPayload {
  id: number;
}

const request = () => ({ type: types.DELETE_REQUEST });

const success = (id: IDeleteProductResponse) => ({
  type: types.DELETE_SUCCESS,
  payload: { id } as IDeleteProductPayload,
});

const failure = (err: Error) => ({
  type: types.DELETE_FAILURE,
  payload: { ...err },
});

export const deleteProduct = (dispatch: AppDispatch, id: number) =>
  apiAction<unknown>(
    dispatch,
    request,
    () => success(id),
    failure,
    () => window.api.delete('products', `id = '${id}'`)
  );
