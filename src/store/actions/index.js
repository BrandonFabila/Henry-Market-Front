import axios from 'axios';

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const USER_LOGIN = "USER_LOGIN"

const api_host = 'http://localhost:3001'

export function getAllProducts() {
  return function (dispatch) {
    axios.get(`${api_host}/api/products/`).then((products) => {
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: products.data,
      });
    }).catch(err => console.log(err)) 
  };
}

export function userLoggedIn(estado) {
  return {
    type: USER_LOGIN,
    payload: estado,
  };
}