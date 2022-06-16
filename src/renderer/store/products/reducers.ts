import { createReducer } from '@reduxjs/toolkit';
import IProduct from '../../../utils/interfaces/IProduct';
import { ICreateProductPayload } from './actions/create';
import { IDeleteProductPayload } from './actions/delete';
import { IReadProductsPayload } from './actions/read';
import * as types from './constants';
import * as typeTypes from '../types/constants';
import { IDeleteTypePayload } from '../types/actions/delete';

export interface IProductsState {
  allIds: number[];
  byId: {
    [id: number]: IProduct;
  };
}

export const getInitialState = (): IProductsState => ({
  allIds: [],
  byId: {},
});

const productsReducer = createReducer(getInitialState(), {
  [types.CREATE_SUCCESS]: (
    state,
    { payload }: { payload: ICreateProductPayload }
  ) => {
    const { product } = payload;

    if (product && product.id) {
      state.byId[product.id] = product;
      state.allIds.push(product.id);
    }
  },
  [types.READ_SUCCESS]: (
    state,
    { payload }: { payload: IReadProductsPayload }
  ) => {
    const { products } = payload;
    const byId: { [id: number]: IProduct } = {};
    const allIds: number[] = [];

    products.forEach((product) => {
      byId[product.id] = product;
      allIds.push(product.id);
    });

    state.byId = byId;
    state.allIds = allIds;
  },
  [types.DELETE_SUCCESS]: (
    state,
    { payload }: { payload: IDeleteProductPayload }
  ) => {
    const { id } = payload;

    state.allIds = state.allIds.filter((val) => val !== id);
    delete state.byId[id];
  },
  [typeTypes.DELETE_SUCCESS]: (
    state,
    { payload }: { payload: IDeleteTypePayload }
  ) => {
    const ids: number[] = [];

    state.allIds = state.allIds.filter((id) => {
      const product = state.byId[id];

      if (product.typeId === payload.id) {
        ids.push(product.id);
        return false;
      }
      return true;
    });

    ids.forEach((id) => delete state.byId[id]);
  },
});

export default productsReducer;
