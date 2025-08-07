import { useEffect } from 'react';
import {
  getAccessToken,
  getRefreshToken,
  clearAuthTokens,
  setTokens,
} from '../utils/auth';
import axiosInstance from '../api/axios';

const useAxiosInterceptor = () => {
  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        const accessToken = getAccessToken();
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = getRefreshToken();
            if (!refreshToken) {
              clearAuthTokens();
              return Promise.reject(new Error('No refresh token available'));
            }
            await axiosInstance.post('/refresh-token');
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            clearAuthTokens();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return null;
};

export default useAxiosInterceptor;
