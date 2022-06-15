import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import users from './users/reducers';

const rootReducer = combineReducers({
  users,
});

export const store = configureStore({ reducer: rootReducer });

export type IState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
