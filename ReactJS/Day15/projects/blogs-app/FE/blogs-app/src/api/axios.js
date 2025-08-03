import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8005/api',
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't intercept logout requests or refresh token requests that fail
    if (originalRequest.url?.includes('/auth/logout') || 
        originalRequest.url?.includes('/auth/refresh-token')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If we're already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return axiosInstance(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call your refresh token endpoint
        const refreshResponse = await axiosInstance.post('/auth/refresh-token');
        
        if (refreshResponse.data.success) {
          // Token refresh successful, process queued requests
          processQueue(null);
          isRefreshing = false;
          
          // Retry the original request
          return axiosInstance(originalRequest);
        } else {
          throw new Error('Refresh failed');
        }
      } catch (refreshError) {
        // Refresh failed, process queue with error
        processQueue(refreshError, null);
        isRefreshing = false;
        
        // Clear any auth state and redirect to login
        localStorage.removeItem('user'); // if you store user in localStorage
        sessionStorage.clear(); // clear any session data
        
        // Only redirect if we're not already on login/register pages
        if (!window.location.pathname.includes('/login') && 
            !window.location.pathname.includes('/register')) {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
