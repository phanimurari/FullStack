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

const initialState = {
  cart: null,
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_REQUEST:
    case UPDATE_CART_ITEM_REQUEST:
    case DELETE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
      };
    case UPDATE_CART_ITEM_SUCCESS:
    case DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case FETCH_CART_FAILURE:
    case UPDATE_CART_ITEM_FAILURE:
    case DELETE_CART_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PLACE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        orderPlaced: false,
      };
    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        orderPlaced: true,
      };
    case PLACE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        orderPlaced: false,
      };
    default:
      return state;
  }
};

export default cartReducer;
