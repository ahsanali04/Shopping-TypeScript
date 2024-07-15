import * as Actions from '../types';
import { Product } from '../actions/interface';
const initialState = {
  cart: [],
};

export const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case Actions.update_cart: {
      return {
        ...state,
        cart: action.payload,
      };
    }
    default:
      return state;
  }
};