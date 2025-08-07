import axios from 'axios';
import {
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE,
  FETCH_BLOG_REQUEST,
  FETCH_BLOG_SUCCESS,
  FETCH_BLOG_FAILURE,
} from './blogsActionTypes';

export const fetchBlogs = (searchQuery) => async (dispatch) => {
  dispatch({ type: FETCH_BLOGS_REQUEST });
  try {
    const response = await axios.get(`http://localhost:8005/api/blogs?${searchQuery}`);
    dispatch({
      type: FETCH_BLOGS_SUCCESS,
      payload: response.data.posts,
    });
  } catch (error) {
    dispatch({
      type: FETCH_BLOGS_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchBlog = (id) => async (dispatch) => {
  dispatch({ type: FETCH_BLOG_REQUEST });
  try {
    const response = await axios.get(`http://localhost:8005/api/blogs/${id}`);
    dispatch({ type: FETCH_BLOG_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: FETCH_BLOG_FAILURE, payload: error.message });
  }
};
