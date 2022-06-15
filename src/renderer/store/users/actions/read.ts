import { IUser } from '../../../../utils/interfaces/IUser';
import apiAction from '../../../../utils/apiAction';
import * as types from '../constants';
import { AppDispatch } from '../..';

type IReadUsersResponse = IUser[];
export interface IReadUsersPayload {
  users: IUser[];
}

const request = () => ({ type: types.READ_REQUEST });

const success = (users: IReadUsersResponse) => ({
  type: types.READ_SUCCESS,
  payload: { users } as IReadUsersPayload,
});

const failure = (err: Error) => ({
  type: types.READ_FAILURE,
  payload: { ...err },
});

const readUsers = (dispatch: AppDispatch) =>
  apiAction<unknown>(
    dispatch,
    request,
    (req) => success(req),
    failure,
    () => {
      return window.api.read('users');
    }
  );
export default readUsers;
