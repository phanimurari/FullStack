import api from '../../api/axios';
import {
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  DELETE_CART_ITEM_REQUEST,
  DELETE_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_FAILURE,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
} from './cartActionTypes';

export const fetchCart = () => async (dispatch) => {
  dispatch({ type: FETCH_CART_REQUEST });
  try {
    const response = await api.get('/restaurant/cart');
    dispatch({ type: FETCH_CART_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_CART_FAILURE, payload: error.message });
  }
};

export const updateCartItem = (item) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });
  try {
    await api.post('/restaurant/addtocart', item);
    dispatch({ type: UPDATE_CART_ITEM_SUCCESS });
    dispatch(fetchCart());
  } catch (error) {
    dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
  }
};

export const deleteCartItem = (item) => async (dispatch) => {
  dispatch({ type: DELETE_CART_ITEM_REQUEST });
  try {
    await api.post('/restaurant/addtocart', { ...item, quantity: 0 });
    dispatch({ type: DELETE_CART_ITEM_SUCCESS });
    dispatch(fetchCart());
  } catch (error) {
    dispatch({ type: DELETE_CART_ITEM_FAILURE, payload: error.message });
  }
};

export const placeOrder = () => async (dispatch) => {
  dispatch({ type: PLACE_ORDER_REQUEST });
  try {
    const response = await api.post('/restaurant/placeorder');
    dispatch({ type: PLACE_ORDER_SUCCESS, payload: response.data });
    dispatch(fetchCart());
  } catch (error) {
    dispatch({ type: PLACE_ORDER_FAILURE, payload: error.message });
  }
};
