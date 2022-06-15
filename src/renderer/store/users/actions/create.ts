import { AppDispatch } from 'renderer/store';
import apiAction from 'utils/apiAction';
import { IUser } from '../../../../utils/interfaces/IUser';
import * as types from '../constants';

type ICreateUserResponse = IUser[];
export interface ICreateUserPayload {
  user: IUser;
}

const request = () => ({ type: types.CREATE_REQUEST });

const success = (users: ICreateUserResponse) => ({
  type: types.CREATE_SUCCESS,
  payload: { user: users[0] } as ICreateUserPayload,
});

const failure = (err: Error) => ({
  type: types.CREATE_FAILURE,
  payload: { ...err },
});

export const createUser = (dispatch: AppDispatch, user: IUser) =>
  apiAction<unknown>(
    dispatch,
    request,
    (req) => success(req),
    failure,
    () => {
      const { firstName, lastName, age, email, password, isAdmin } = user;
      const fields = [
        'firstName',
        'lastName',
        'age',
        'email',
        'password',
        'isAdmin',
      ];
      const values = [firstName, lastName, age, email, password, isAdmin];

      return window.api.create('users', fields, values);
    }
  );
