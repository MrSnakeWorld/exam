import { IEditableProduct } from '../../../utils/interfaces/IProduct';
import * as types from './constants';

export interface IProductToCartPayload {
  product: IEditableProduct;
}

export const productToCart = (product: IEditableProduct) => ({
  type: types.PRODUCT_TO_CART,
  payload: { product } as IProductToCartPayload,
});

export const clearCart = () => ({
  type: types.CLEAR_CART,
});
