import IType from '../../../../utils/interfaces/IType';
import apiAction from '../../../../utils/apiAction';
import * as types from '../constants';
import { AppDispatch } from '../..';

type IReadTypesResponse = IType[];
export interface IReadTypesPayload {
  types: IType[];
}

const request = () => ({ type: types.READ_REQUEST });

const success = (res: IReadTypesResponse) => ({
  type: types.READ_SUCCESS,
  payload: { types: res } as IReadTypesPayload,
});

const failure = (err: Error) => ({
  type: types.READ_FAILURE,
  payload: { ...err },
});

const readTypes = (dispatch: AppDispatch) =>
  apiAction<unknown>(
    dispatch,
    request,
    (req) => success(req),
    failure,
    () => {
      return window.api.read('types');
    }
  );
export default readTypes;
