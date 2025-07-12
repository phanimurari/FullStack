import { SET_PRODUCTS } from '../actions/productActions';

const initialState = [];

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};

export default productsReducer;