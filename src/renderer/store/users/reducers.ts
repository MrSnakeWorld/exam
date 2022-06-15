import {createReducer} from '@reduxjs/toolkit';
import {IUser} from '../../utils/interfaces/IUser';
import * as types from './constants';

export interface IUsersState {
	allIds: string[];
	byId: {
		[id: string]: IUser
	};
}

export const getInitialState = (): IUsersState => ({
	allIds: [],
	byId: {}
});

export const users = createReducer<IUsersState>(
	getInitialState(), {
		[types.CREATE_SUCCESS]: (
			state,
			{payload}: {payload: unknown}
		) => {
			
		}
	}
);