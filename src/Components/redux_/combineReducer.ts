import {combineReducers} from 'redux';
import {prodcutsReducer} from './reducers/productsReducers';
import {cartReducers} from './reducers/cartReducers';

export const rootReducer = combineReducers({
  products: prodcutsReducer,
  cart: cartReducers,
});

// export default rootReducer;
