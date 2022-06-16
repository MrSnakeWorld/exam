import { IState } from '..';

export const getProductsData = (state: IState) => state.products;

export const getProductsAsArray = (state: IState) => {
  const { products } = state;

  return products.allIds.map((id) => products.byId[id]);
};
