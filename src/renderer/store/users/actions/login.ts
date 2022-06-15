import { IUser } from 'utils/interfaces/IUser';
import * as types from '../constants';

export interface ILoginUserPayload {
  user: IUser;
}

export const loginUser = (user: IUser) => ({
  type: types.LOGIN,
  payload: { user } as ILoginUserPayload,
});
