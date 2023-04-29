import axios from 'axios';

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
export const USER_LOGIN = "USER_LOGIN"
export const GET_CATEGORY = "GET_CATEGORY"
export const GET_PRODUCT_BY_CATEGORY = "GET_PRODUCT_BY_CATEGORY"
export const GET_PRODUCT_BY_NAME = "GET_PRODUCT_BY_NAME"
export const LOADING = "LOADING"
export const READY = "READY"
export const GET_PRODUCT_FILTERED = "GET_PRODUCT_FILTERED"

 const api_host= "http://localhost:3001";
//const api_host = 'https://henry-market-back-production.up.railway.app/'

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

export const getProductByName = (name) => async (dispatch) => {
  // return { type: action.GET_PRODUCT_BY_NAME, payload: name };
  try {
    dispatch(loading());
    const res = await axios.get(`${api_host}/products?name=${name}`);
    const result = res.data;
    console.log(result);
     dispatch({
      type: GET_PRODUCT_BY_NAME,
      payload: result,
    });
    dispatch(ready());
  } catch (error) {
    console.log(error);
  }
};

export function loading() {
  return {
    type: LOADING,
  };
}

export function ready() {
  return {
    type: READY,
  };
}

export const getProductFiltered = (id_categoria_producto) => {
  return async function (dispatch){
      const {data} = await axios.get(`${api_host}/products/categoria/${id_categoria_producto}`);
      dispatch({type: GET_PRODUCT_FILTERED, payload: data});
      console.log("estteee", data)
  };
}