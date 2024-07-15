import * as Actions from '../types';
import {Product} from './interface';
import {getData} from '../../common/axiosGenerics';

export const getProducts = () => {
  return async dispatch => {
    try {
      const response = await getData<Product[]>(
        'https://fakestoreapi.com/products',
      );
      console.log('Fetched products:', response); // Debug: check the fetched data
      dispatch({type: Actions.get_products, payload: response});
    } catch (e) {
      console.log(e);
    }
  };
};
