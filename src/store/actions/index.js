import axios from 'axios';

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

export function getAllProducts() {
  return function (dispatch) {
    axios.get('http://localhost:3001/api/products/').then((products) => {
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: products.data,
      });
    });
  };
}
