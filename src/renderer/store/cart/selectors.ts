import { IState } from '..';

const getCart = (state: IState) => state.cart.products;

export default getCart;
