import { AppDispatch } from '../../../store';
import apiAction from '../../../../utils/apiAction';
import IType from '../../../../utils/interfaces/IType';
import * as types from '../constants';

type ICreateTypeResponse = IType[];
export interface ICreateTypePayload {
  type: IType;
}

const request = () => ({ type: types.CREATE_REQUEST });

const success = (res: ICreateTypeResponse) => ({
  type: types.CREATE_SUCCESS,
  payload: { type: res[0] } as ICreateTypePayload,
});

const failure = (err: Error) => ({
  type: types.CREATE_FAILURE,
  payload: { ...err },
});

export const createType = (dispatch: AppDispatch, type: IType) =>
  apiAction<unknown>(
    dispatch,
    request,
    (req) => success(req),
    failure,
    () => {
      const { name, description } = type;
      const fields = ['name', 'description'];
      const values = [name, description];

      return window.api.create('types', fields, values);
    }
  );
