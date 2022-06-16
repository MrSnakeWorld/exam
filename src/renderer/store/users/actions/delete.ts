import { AppDispatch } from '../../../store';
import apiAction from '../../../../utils/apiAction';
import * as types from '../constants';

type IDeleteUserResponse = number;
export interface IDeleteUserPayload {
  id: number;
}

const request = () => ({ type: types.DELETE_REQUEST });

const success = (id: IDeleteUserResponse) => ({
  type: types.DELETE_SUCCESS,
  payload: { id } as IDeleteUserPayload,
});

const failure = (err: Error) => ({
  type: types.DELETE_FAILURE,
  payload: { ...err },
});

export const deleteUser = (dispatch: AppDispatch, id: number) =>
  apiAction<unknown>(
    dispatch,
    request,
    () => success(id),
    failure,
    () => window.api.delete('users', `id = '${id}'`)
  );
