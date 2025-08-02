import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import blogsReducer from './blogs/blogsReducer';

const rootReducer = combineReducers({
  blogs: blogsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
