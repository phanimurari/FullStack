// Action Types
export const SET_PRODUCTS = 'SET_PRODUCTS';

// Action Creators
export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products
});