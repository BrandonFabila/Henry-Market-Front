import { GET_ALL_PRODUCTS } from '../actions';

const initialState = { products: [], filteredProducts: [] };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
      };
    default:
      return state;
  }
}
