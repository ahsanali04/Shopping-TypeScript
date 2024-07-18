import * as Actions from '../types';

const initialState = {
  products: [],
};

export const prodcutsReducer = (state = initialState, action) => {
  //   console.log('action', action.payload);
  switch (action.type) {
    case Actions.get_products: {
      return {
        ...state,
        products: action.payload,
      };
    }
    default:
      return state;
  }
};
