import { IUser } from '../../../../utils/interfaces/IUser';
import apiAction from '../../../../utils/apiAction';
import * as types from '../constants';
import { AppDispatch } from '../..';

const request = () => ({ type: types.CREATE_REQUEST });

const success = (user: IUser) => ({
  type: types.CREATE_SUCCESS,
  payload: { user },
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
      const { firstName, lastName, age, email, password } = user;
      const fields = ['firstName', 'lastName', 'age', 'email', 'password'];
      const values = [firstName, lastName, age, email, password];

      return window.electron.api.create(fields, values);
    }
  );
