import api from '../../api/axios';
import {
  FETCH_RESTAURANTS_REQUEST,
  FETCH_RESTAURANTS_SUCCESS,
  FETCH_RESTAURANTS_FAILURE,
  FETCH_RESTAURANT_DETAILS_REQUEST,
  FETCH_RESTAURANT_DETAILS_SUCCESS,
  FETCH_RESTAURANT_DETAILS_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  UPDATE_CART,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAILURE,
} from './restaurantsActionTypes';
import { toast } from 'react-toastify';

export const fetchRestaurants = () => async (dispatch) => {
  dispatch({ type: FETCH_RESTAURANTS_REQUEST });
  try {
    const response = await api.get('/restaurant?offset=0&limit=20');
    dispatch({
      type: FETCH_RESTAURANTS_SUCCESS,
      payload: response.data.restaurants,
    });
  } catch (error) {
    dispatch({
      type: FETCH_RESTAURANTS_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchRestaurantDetails = (id) => async (dispatch) => {
  dispatch({ type: FETCH_RESTAURANT_DETAILS_REQUEST });
  try {
    const response = await api.get(`/restaurant/${id}`);
    dispatch({
      type: FETCH_RESTAURANT_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_RESTAURANT_DETAILS_FAILURE,
      payload: error.message,
    });
  }
};

export const addToCart = (cartData) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_REQUEST });
  try {
    await api.post('/restaurant/addtocart', cartData);
    dispatch({ type: UPDATE_CART_SUCCESS });
    toast.success('Added to cart Successfully');
  } catch (error) {
    dispatch({
      type: UPDATE_CART_FAILURE,
      payload: error.message,
    });
    toast.error('Failed to update cart');
  }
};

export const updateCart = (cart) => ({
  type: UPDATE_CART,
  payload: cart,
});
