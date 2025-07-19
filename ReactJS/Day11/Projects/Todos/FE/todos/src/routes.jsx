import React from 'react';
import App from './App';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Profile from './routes/Profile';
import NotFound from './routes/NotFound';

import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("jwt_token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Public route component for authenticated users
const PublicRoute = ({ children }) => {
  const token = Cookies.get("jwt_token");
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};


// Route wrapper component
const RouteWrapper = ({ Component, isProtected, isPublic }) => {
  if (isProtected) {
    return (
      <ProtectedRoute>
        <Component />
      </ProtectedRoute>
    );
  }
  
  if (isPublic) {
    return (
      <PublicRoute>
        <Component />
      </PublicRoute>
    );
  }
  
  return <Component />;
};

const routes = [
  {
    path: '/',
    Component: App,
    children: [
      { 
        index: true, 
        Component: () => <RouteWrapper Component={Home} isProtected={true} />
      },
      { 
        path: 'login', 
        Component: () => <RouteWrapper Component={Login} isPublic={true} />
      },
      { 
        path: 'register', 
        Component: () => <RouteWrapper Component={Register} isPublic={true} />
      },
      { 
        path: 'profile', 
        Component: () => <RouteWrapper Component={Profile} isProtected={true} />
      },
      // 👇 Catch-all 404 route (MUST be last among children)
      { path: '*', Component: NotFound },
    ],
  },
  {
    path: '*', // outside layout
    Component: NotFound,
  }
];

export default routes;
