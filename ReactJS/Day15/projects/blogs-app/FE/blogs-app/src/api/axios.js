import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8005/api',
  withCredentials: true,
});

export default axiosInstance;
