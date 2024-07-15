import * as Actions from '../types';
import {Product} from './interface';

function isProductInCart(productId: number, cart: Product[]) {
  console.log('cart===', cart);
  return cart?.filter(product => product.id === productId).length > 0;
}
export const getCart = (item: Product, cart: Product[]) => {
  return dispatch => {
    const result = isProductInCart(item.id, cart);
    const res = cart?.filter(data => data.id !== item.id);
    console.log('!!res', res);

    if (result) {
      // If the product is already in the cart, increment the quantity
      const updatedCart = cart.map(cartItem =>
        cartItem.id === item.id
          ? {...cartItem, quantity: cartItem.quantity + 1}
          : cartItem,
      );
      dispatch({type: Actions.update_cart, payload: updatedCart});
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      const updatedItem = {...item, quantity: 1};
      dispatch({type: Actions.update_cart, payload: [...cart, updatedItem]});
    }
  };
};
