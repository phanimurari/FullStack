import {
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE,
  FETCH_BLOG_REQUEST,
  FETCH_BLOG_SUCCESS,
  FETCH_BLOG_FAILURE,
} from './blogsActionTypes';

const initialState = {
  loading: false,
  blogs: [],
  blog: null,
  error: '',
};

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BLOGS_SUCCESS:
      return {
        loading: false,
        blogs: action.payload,
        error: '',
      };
    case FETCH_BLOGS_FAILURE:
      return {
        loading: false,
        blogs: [],
        error: action.payload,
      };
    case FETCH_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blog: action.payload,
        error: '',
      };
    case FETCH_BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        blog: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default blogsReducer;
