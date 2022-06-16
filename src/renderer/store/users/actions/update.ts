import { AppDispatch } from '../../../store';
import apiAction from '../../../../utils/apiAction';
import { IUser } from '../../../../utils/interfaces/IUser';
import * as types from '../constants';

type IUpdateUserResponse = IUser[];
export interface IUpdateUserPayload {
  user: IUser;
}

const request = () => ({ type: types.UPDATE_REQUEST });

const success = (users: IUpdateUserResponse) => ({
  type: types.UPDATE_SUCCESS,
  payload: { user: users[0] } as IUpdateUserPayload,
});

const failure = (err: Error) => ({
  type: types.UPDATE_FAILURE,
  payload: { ...err },
});

export const updateUser = (dispatch: AppDispatch, user: IUser) =>
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

      return window.api.update('users', fields, values, String(user.id));
    }
  );
