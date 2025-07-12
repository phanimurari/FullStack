import { 
  ADD_TO_CART, 
  REMOVE_FROM_CART, 
  UPDATE_QUANTITY, 
  CLEAR_CART, 
  PARTIAL_CHECKOUT
} from '../actions/cartActions';

const initialState = [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Check if item already exists in cart
      const existingItem = state.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // If item exists, increase quantity
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new item, add it with quantity 1
        return [...state, { ...action.payload, quantity: 1 }];
      }
    
    case REMOVE_FROM_CART:
      // Remove item completely from cart
      return state.filter(item => item.id !== action.payload);
    
    case UPDATE_QUANTITY:
      // Update specific item quantity
      return state.map(item =>
        item.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    
    case CLEAR_CART:
      // Empty the entire cart
      return [];
    
    case PARTIAL_CHECKOUT:
      // implement partial checkout logic here
      return [];

    default:
      return state;
  }
};

export default cartReducer;