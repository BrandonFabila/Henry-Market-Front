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
export const ORDERED_BY_NAME_ASC ="ORDERED_BY_NAME_ASC"
export const ORDERED_BY_NAME_DESC ="ORDERED_BY_NAME_DESC"
export const ORDERED_BY_LOWEST_PRICE ="ORDERED_BY_LOWEST_PRICE"
export const ORDERED_BY_HIGHEST_PRICE = "ORDERED_BY_HIGHEST_PRICE"
export const  ORDERED_BY_RECIENTES =  "ORDERED_BY_RECIENTES"
export const GET_USER_BY_EMAIL = "GET_USER_BY_EMAIL"
export const GET_USER_BY_ID = "GET_USER_BY_ID"
export const COUNT_DELETE = "COUNT_DELETE"
export const BORRAR_DEL_CARRITO = "BORRAR_DEL_CARRITO"
export const RESTAR_CANTIDAD_CARRITO = "RESTAR_CANTIDAD_CARRITO"
export const SUMAR_CANTIDAD_CARRITO = "SUMAR_CANTIDAD_CARRITO"
export const COUNT_RESTAR = "COUNT_RESTAR"
export const COUNT_SUMAR = "COUNT_SUMAR"
export const AGREGAR_AL_CARRITO = "AGREGAR_AL_CARRITO"
export const CLEAN_PRODUCT = "CLEAN_PRODUCT"
export const COUNT_AGREGAR = "COUNT_AGREGAR"
export const  REVIEWS = "REVIEWS"
export const CLEAN_REVIEWS = "CLEAN_REVIEWS"
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"
export const GET_ALL_USERS = "GET_ALL_USERS"
export const GET_SHOPPING = "GET_SHOPPING"

 const api_host= "http://localhost:3001/";
//const api_host = 'https://henry-market-back-production.up.railway.app/'

export function getAllProducts() {
  return function (dispatch) {
    axios.get(`${api_host}products`).then((products) => {
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: products.data,
      });
    }).catch(err => console.log(err)) 
  };
};

export const getProductById = (id_producto) => {
  return async function (dispatch){
      const {data} = await axios.get(`${api_host}products/${id_producto}`);
      dispatch({type: GET_PRODUCT_BY_ID, payload: data});
  };
}

export function updateProduct(producto) {
  return async (dispatch) =>{
    try {
      const response = await axios.put(`${api_host}products/${producto.id_producto}/editProduct`, producto)
      dispatch({
        type: UPDATE_PRODUCT,
        payload: response.data
      })
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT,
        payload: error
      })
    }
  }
}

export function userLoggedIn(estado) {
  return {
    type: USER_LOGIN,
    payload: estado,
  };
}

export function getCategorys() {
  return async function (dispatch) {
    const resp = await axios.get(`${api_host}categorias`);
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
    const res = await axios.get(`${api_host}products?name=${name}`);
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
      const {data} = await axios.get(`${api_host}products/categoria/${id_categoria_producto}`);
      dispatch({type: GET_PRODUCT_FILTERED, payload: data});
  };
}

export const orderedByNameASC = () => {
  return { type: ORDERED_BY_NAME_ASC };
};

export const orderedByNameDESC = () => {
  return { type: ORDERED_BY_NAME_DESC };
};

export const orderedByLowestPrice = () => {
  return { type: ORDERED_BY_LOWEST_PRICE };
};

export const orderedByHighestPrice = () => {
  return { type: ORDERED_BY_HIGHEST_PRICE };
};

export const orderedByRecientes = () => {
  return { type: ORDERED_BY_RECIENTES };
};

export const getProductFilteredDescuento = (id_categoria_producto) => {
  return async function (dispatch){
      const {data} = await axios.get(`${api_host}products/filter/descuento/${id_categoria_producto}`);
      dispatch({type: GET_PRODUCT_FILTERED, payload: data});

      console.log("estteee", data)
  };
}

export function getUsuarioByEmail(email) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${api_host}email?email=${email}`);
      console.log(response);
      dispatch({
        type: GET_USER_BY_EMAIL,
        payload: response.data,
      });
    } catch (error) {
      console.log(error, "No se encontro usuario con ese email");
      dispatch({
        type: GET_USER_BY_EMAIL,
        payload: error,
      });
    }
  };
};

export function getShopping() {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${api_host}venta`);
        // console.log(response);
        dispatch({
          type: GET_SHOPPING,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: GET_SHOPPING,
          payload: error,
        });
      }
    };
  }

 export const getUserById = (id) => async (dispatch) => {
  try {
    dispatch(loading());
    const res = await axios.get(`${api_host}usuario/${id}`);
    dispatch({
      type: GET_USER_BY_ID,
      payload: res.data,
    });
    dispatch(ready());
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_USER_BY_ID,
      payload: error,
    });
    dispatch(ready());
  }
};

export function deleteCount(quantity) {
  return {
    type: COUNT_DELETE,
    payload: quantity
  }
}

export function eliminarDelCarrito(id) {
  return {
    type: BORRAR_DEL_CARRITO,
    payload: id,
  };
}

export function restarCantidad(id) {
  return {
    type: RESTAR_CANTIDAD_CARRITO,
    payload: id,
  };
}

export function restarCount() {
  return {
    type: COUNT_RESTAR,
  }
}

export function sumarCantidad(id) {
  return {
    type: SUMAR_CANTIDAD_CARRITO,
    payload: id,
  };
}


export function sumarCount() {
  return {
    type: COUNT_SUMAR,
  }
}

export function agregarAlCarrito(id, quantity) {
  console.log(id);
  return {
    type: AGREGAR_AL_CARRITO,
    payload: { id, quantity },
  };
}

export function cleanProduct() {
  return {
    type: CLEAN_PRODUCT,
  };
}

export function agregarCount(quantity) {
  return {
    type: COUNT_AGREGAR,
    payload: quantity
  }
}

export function getReviews(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${api_host}products/${id}/calificaciones`);
      console.log(response.data);
      dispatch({ type: REVIEWS, payload: response.data });
    } catch (error) {
      dispatch({ type: REVIEWS, payload: error });
    }
  };
}

export function cleanReviews() {
  return {
    type: CLEAN_REVIEWS,
  };
}
 

export const getAllUsers = () => {
  return async (dispatch) => {
    try {

      const response = await axios.get(`${api_host}usuario`);
      // console.log(response.data);
      dispatch({ type: GET_ALL_USERS, payload: response.data });

    } catch (error) {
      console.log(error);
      dispatch({ type:GET_ALL_USERS, payload: error });

    }
  };
};