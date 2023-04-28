import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, USER_LOGIN ,GET_CATEGORY, GET_PRODUCT_BY_CATEGORY, GET_PRODUCT_BY_NAME, READY,LOADING} from '../actions';

const initialState = { 
    products: [],
    product: {},
    productsFitered:[],
    copyProducts:[],
    logIn: false,
    categorys:[],
    display: false,
  };

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
      case GET_PRODUCT_BY_CATEGORY:
      return {
        ...state,
        productsFitered: [...state.products].filter((product) => {
          return (
            product.Categoria_producto.nombre_categoria_producto ===
            action.payload
          );
        }),
        copyProducts: [...state.products].filter((product) => {
          return (
            product.Categoria_producto.nombre_categoria_producto ===
            action.payload
          );
        }),
      };
    default:
      return state;
  }
}
