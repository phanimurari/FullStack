import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axios';
import { setTokens, logout as logoutUser } from '../utils/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axiosInstance.get('/auth/me');
        if (response.data.success) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        // If the error is 401 and refresh token is also not available,
        // just set as not authenticated
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });
      
      if (response.data.accessToken && response.data.refreshToken) {
        const { accessToken, refreshToken, user } = response.data;
        setTokens(accessToken, refreshToken);
      }
      
      setUser(response.data.user);
      setIsAuthenticated(true);
      return { user: response.data.user };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axiosInstance.post('/auth/register', {
        username,
        email,
        password,
      });
      
      if (response.data.accessToken && response.data.refreshToken) {
        const { accessToken, refreshToken, user } = response.data;
        setTokens(accessToken, refreshToken);
      }
      
      setUser(response.data.user);
      setIsAuthenticated(true);
      return { user: response.data.user };
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = async () => {
    // Set loading state to prevent auth checks during logout
    setIsLoading(true);
    
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      // Don't log logout errors as they're expected when tokens are invalid
    } finally {
      // Clear local state first
      setUser(null);
      setIsAuthenticated(false);
      
      // Clear tokens and other auth data
      logoutUser();
      
      // Clear any additional storage
      localStorage.clear();
      sessionStorage.clear();
      
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
