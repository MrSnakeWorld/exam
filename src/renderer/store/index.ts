import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({});

export const store = configureStore({reducer: rootReducer});

export type IState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;