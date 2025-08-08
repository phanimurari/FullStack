import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import restaurantsReducer from './restaurants/restaurantsReducer';
import cartReducer from './cart/cartReducer';

const rootReducer = combineReducers({
  restaurants: restaurantsReducer,
  cart: cartReducer,  
});

const store = createStore(rootReducer, applyMiddleware(thunk)
);

export default store;
