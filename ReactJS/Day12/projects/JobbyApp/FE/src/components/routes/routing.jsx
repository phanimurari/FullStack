
import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";

// Protected route component for authenticated users only
const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("jwt_token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Public route component for unauthenticated users only
const PublicRoute = ({ children }) => {
  const token = Cookies.get("jwt_token");
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export {ProtectedRoute, PublicRoute}

