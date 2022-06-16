import { AppDispatch } from '../../../store';
import apiAction from '../../../../utils/apiAction';
import * as types from '../constants';

type IDeleteTypeResponse = number;
export interface IDeleteTypePayload {
  id: number;
}

const request = () => ({ type: types.DELETE_REQUEST });

const success = (id: IDeleteTypeResponse) => ({
  type: types.DELETE_SUCCESS,
  payload: { id } as IDeleteTypePayload,
});

const failure = (err: Error) => ({
  type: types.DELETE_FAILURE,
  payload: { ...err },
});

export const deleteType = (dispatch: AppDispatch, id: number) =>
  apiAction<unknown>(
    dispatch,
    request,
    () => success(id),
    failure,
    () => {
      const promises: Array<Promise<unknown>> = [];
      const { api } = window;

      promises.push(api.delete('types', `id = '${id}'`));
      promises.push(api.delete('products', `typeId = ${id}`));

      return Promise.all(promises);
    }
  );
