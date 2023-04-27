import { GET_ALL_PRODUCTS, USER_LOGIN } from '../actions';

const initialState = { products: [],
   filteredProducts: [],
   logIn: false
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
    default:
      return state;
  }
}
