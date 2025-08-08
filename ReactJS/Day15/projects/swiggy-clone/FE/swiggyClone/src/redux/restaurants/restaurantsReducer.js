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

const initialState = {
  restaurants: [],
  restaurantDetails: null,
  cart: {},
  loading: false,
  error: null,
  isCartUpdating: false,
};

const restaurantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESTAURANTS_REQUEST:
    case FETCH_RESTAURANT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_TO_CART_REQUEST:
    case UPDATE_CART_REQUEST:
      return {
        ...state,
        isCartUpdating: true,
        error: null,
      };
    case FETCH_RESTAURANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload,
      };
    case FETCH_RESTAURANT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurantDetails: action.payload,
      };
    case ADD_TO_CART_SUCCESS:
    case UPDATE_CART_SUCCESS:
      return {
        ...state,
        isCartUpdating: false,
      };
    case FETCH_RESTAURANTS_FAILURE:
    case FETCH_RESTAURANT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_TO_CART_FAILURE:
    case UPDATE_CART_FAILURE:
      return {
        ...state,
        isCartUpdating: false,
        error: action.payload,
      };
    case UPDATE_CART:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};

export default restaurantsReducer;
