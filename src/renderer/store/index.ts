import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import users from './users/reducers';
import products from './products/reducers';
import types from './types/reducers';
import cart from './cart/reducers';
import orders from './orders/reducers';

const rootReducer = combineReducers({ users, products, types, cart, orders });

export const store = configureStore({ reducer: rootReducer });

export type IState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
