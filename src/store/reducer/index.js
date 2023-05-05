import {GET_PRODUCT_FILTERED, GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, USER_LOGIN ,
  GET_CATEGORY, GET_PRODUCT_BY_NAME, READY,LOADING,ORDERED_BY_NAME_ASC,ORDERED_BY_NAME_DESC 
,ORDERED_BY_LOWEST_PRICE,ORDERED_BY_HIGHEST_PRICE, ORDERED_BY_RECIENTES, GET_USER_BY_EMAIL,GET_USER_BY_ID,
COUNT_DELETE ,BORRAR_DEL_CARRITO, RESTAR_CANTIDAD_CARRITO, SUMAR_CANTIDAD_CARRITO, COUNT_RESTAR,COUNT_SUMAR,AGREGAR_AL_CARRITO 
,CLEAN_PRODUCT, COUNT_AGREGAR,REVIEWS,CLEAN_REVIEWS, GET_SHOPPING} from '../actions';

const initialState = { 
    products: [],
    product: {},
    productsFitered:[],
    copyProducts:[],
    logIn: false,
    categorys:[],
    display: false,
    usuario: [],
    countCarrito: JSON.parse(window.localStorage.getItem("count")) || 0,
    carrito: JSON.parse(window.localStorage.getItem("carrito")) || [],
    reviews:[],
    compras: []

  };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CLEAN_REVIEWS:
      return {
        ...state,
        reviews: [],
      };
    case REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case COUNT_AGREGAR:
      return {
        ...state,
        countCarrito: state.countCarrito + action.payload,
      };
    case CLEAN_PRODUCT:
      return {
        ...state,
        product: [],
      };
    case AGREGAR_AL_CARRITO:
      const itemExistente = state.carrito.find(
        (item) => item.id_producto === action.payload.id.id_producto
      );

      if (itemExistente) {
        return {
          ...state,
          carrito: state.carrito.map((item) =>
            item.id_producto === action.payload.id.id_producto
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          ),
        };
      } else {
        //No esta en el carrito
        return {
          ...state,
          carrito: [
            ...state.carrito,
            { ...action.payload.id, cantidad: action.payload.quantity },
          ],
        };
      }
    case COUNT_SUMAR:
      return {
        ...state,
        countCarrito: state.countCarrito + 1,
      };
    case COUNT_RESTAR:
      return {
        ...state,
        countCarrito: state.countCarrito - 1,
      };
    case SUMAR_CANTIDAD_CARRITO:
      return {
        ...state,
        carrito: state.carrito.map((product) =>
          product.id_producto === action.payload.id_producto
            ? { ...product, cantidad: product.cantidad + 1 }
            : product
        ),
      };
    case RESTAR_CANTIDAD_CARRITO:
      return {
        ...state,
        carrito: state.carrito.map((product) =>
          product.id_producto === action.payload.id_producto
            ? { ...product, cantidad: product.cantidad - 1 }
            : product
        ),
      };
    case BORRAR_DEL_CARRITO:
      const filter = state.carrito.filter(
        (p) => p.id_producto !== action.payload.id_producto
      );
      console.log("filter   ", filter);

      return {
        ...state,
        carrito: filter,
      };
    case COUNT_DELETE:
      return {
        ...state,
        countCarrito: state.countCarrito - action.payload,
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        productsFitered: action.payload,
        copyProducts: action.payload,
      };
      case GET_PRODUCT_BY_ID:
      return { ...state, product: action.payload };
      case GET_PRODUCT_BY_NAME:
        return {
          ...state,
          productsFitered: action.payload,
        };
      case USER_LOGIN:
        return {
          ...state,
          logIn: action.payload,
        };
        case GET_CATEGORY:
      return {
        ...state,
        categorys: action.payload,
      };
      case READY:
      return {
        ...state,
        display: false,
      };
      case LOADING:
      return {
        ...state,
        display: true,
      };
     case GET_PRODUCT_FILTERED:
      return{
        ...state,
        productsFitered:action.payload
      }
      case ORDERED_BY_NAME_ASC:
      return {
        ...state,
        productsFitered: [...state.productsFitered].sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        ),
      };
      case ORDERED_BY_NAME_DESC:
      return {
        ...state,
        productsFitered: [...state.productsFitered].sort((a, b) =>
          b.nombre.localeCompare(a.nombre)
        ),
      };
      case ORDERED_BY_LOWEST_PRICE:
      return {
        ...state,
        productsFitered: [...state.productsFitered].sort((a, b) => {
          if (a.valo > b.valor) {
            return 1;
          }
          if (b.valor > a.valor) {
            return -1;
          }
          return 0;
        }),
      };

    case ORDERED_BY_HIGHEST_PRICE:
      return {
        ...state,
        productsFitered: [...state.productsFitered].sort((a, b) => {
          if (a.valor > b.valor) {
            return -1;
          }
          if (b.valor > a.valor) {
            return 1;
          }
          return 0;
        }),
      };
      case ORDERED_BY_RECIENTES:
      return {
        ...state,
        productsFitered: [...state.productsFitered].sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1;
          }
          if (b.createdAt > a.createdAt) {
            return -1;
          }
          return 0;
        }),
        Copyproducts: [...state.productsFitered].sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1;
          }
          if (b.createdAt > a.createdAt) {
            return -1;
          }
          return 0;
        }),
      };
      case GET_USER_BY_EMAIL:
        return {
          ...state,
          usuario: action.payload,
        };

        case GET_USER_BY_ID:
      return {
        ...state,
        usuario: action.payload,
      };

      case GET_SHOPPING:
        return{
          ...state,
          compras: action.payload,
        }

    default:
      return state;
  }
}
