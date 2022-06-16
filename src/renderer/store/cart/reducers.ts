import { createReducer } from '@reduxjs/toolkit';
import { IEditableProduct } from '../../../utils/interfaces/IProduct';
import { IProductToCartPayload } from './actions';
import * as types from './constants';

export interface ICartState {
  products: IEditableProduct[];
}

export const getInitialState = (): ICartState => ({
  products: [],
});

const cartReducer = createReducer(getInitialState(), {
  [types.PRODUCT_TO_CART]: (
    state,
    { payload }: { payload: IProductToCartPayload }
  ) => {
    state.products.push(payload.product);
  },
  [types.CLEAR_CART]: getInitialState,
});

export default cartReducer;
