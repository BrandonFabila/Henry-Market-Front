import axios from 'axios';

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
export const USER_LOGIN = "USER_LOGIN"
export const GET_CATEGORY = "GET_CATEGORY"
export const GET_PRODUCT_BY_CATEGORY = "GET_PRODUCT_BY_CATEGORY"

const api_host= "http://localhost:3001";

export function getAllProducts() {
  return function (dispatch) {
    axios.get(`${api_host}/products`).then((products) => {
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: products.data,
      });
    }).catch(err => console.log(err)) 
  };
};

export const getProductById = (id_producto) => {
  return async function (dispatch){
      const {data} = await axios.get(`${api_host}/products/${id_producto}`);
      dispatch({type: GET_PRODUCT_BY_ID, payload: data});
  };
}

export function userLoggedIn(estado) {
  return {
    type: USER_LOGIN,
    payload: estado,
  };
}

export function getCategorys() {
  return async function (dispatch) {
    const resp = await axios.get(`${api_host}/categorias`);
    dispatch({
      type: GET_CATEGORY,
      payload: resp.data,
    });
  };
}

export const getProductByCategory = (category) => {
  return { type: GET_PRODUCT_BY_CATEGORY, payload: category };
};

