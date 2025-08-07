import axios from 'axios';

// Create a custom axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8005/api', // Base URL for all API requests
  withCredentials: true, // Include cookies in cross-origin requests for authentication
});

// Flags and queue to manage token refresh process
let isRefreshing = false; // Prevents multiple simultaneous refresh attempts
let failedQueue = []; // Queue to store failed requests during token refresh

/**
 * Process all queued requests after token refresh attempt
 * @param {Error|null} error - Error object if refresh failed, null if successful
 * @param {string|null} token - New token if refresh successful (optional parameter)
 */
const processQueue = (error, token = null) => {
  // Resolve or reject all queued promises based on refresh result
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error); // Reject queued requests if refresh failed
    } else {
      prom.resolve(token); // Resolve queued requests if refresh succeeded
    }
  });
  
  // Clear the queue after processing
  failedQueue = [];
};

// Response interceptor to automatically handle token refresh on 401 errors
axiosInstance.interceptors.response.use(
  // Success response handler - pass through unchanged
  (response) => response,
  
  // Error response handler - implements automatic token refresh logic
  async (error) => {
    const originalRequest = error.config; // Store the original failed request

    // Skip token refresh for specific endpoints to prevent infinite loops
    if (originalRequest.url?.includes('/auth/logout') || 
        originalRequest.url?.includes('/auth/refresh-token')) {
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized errors (expired tokens)
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // If token refresh is already in progress, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          // Add request to queue with resolve/reject handlers
          failedQueue.push({ resolve, reject });
        }).then(() => {
          // Retry original request after refresh completes
          return axiosInstance(originalRequest);
        }).catch(err => {
          // Propagate error if refresh failed
          return Promise.reject(err);
        });
      }

      // Mark request as retried to prevent infinite loops
      originalRequest._retry = true;
      // Set refresh flag to prevent concurrent refresh attempts
      isRefreshing = true;

      try {
        // Attempt to refresh the authentication token
        const refreshResponse = await axiosInstance.post('/auth/refresh-token');
        
        // Check if refresh was successful
        if (refreshResponse.data.success) {
          // Process all queued requests (no error, refresh succeeded)
          processQueue(null);
          isRefreshing = false;
          
          // Retry the original request that failed with 401
          return axiosInstance(originalRequest);
        } else {
          // Refresh endpoint returned success: false
          throw new Error('Refresh failed');
        }
      } catch (refreshError) {
        // Token refresh failed - clean up and redirect to login
        
        // Process queued requests with error (all will be rejected)
        processQueue(refreshError, null);
        isRefreshing = false;
        
        // // Clear authentication state from browser storage
        // localStorage.removeItem('user'); // Remove user data if stored in localStorage
        // sessionStorage.clear(); // Clear all session storage data
        
        // Redirect to login page only if not already on auth pages
        if (!window.location.pathname.includes('/login') && 
            !window.location.pathname.includes('/register')) {
          window.location.href = '/login';
        }
        
        // Reject the promise with refresh error
        return Promise.reject(refreshError);
      }
    }

    // For all other errors (non-401), reject without modification
    return Promise.reject(error);
  }
);

// Export the configured axios instance for use throughout the application
export default axiosInstance;
