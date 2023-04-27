import { GET_ALL_PRODUCTS, USER_LOGIN ,GET_CATEGORY, GET_PRODUCT_BY_CATEGORY} from '../actions';

const initialState = { products: [],
  productsFitered:[],
  copyProducts:[],
   filteredProducts: [],
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
        filteredProducts: action.payload,
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
