import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Protected route component for authenticated users only
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth(); // custom hook

  // Logic - to check the token is present inside the cookies.
  // const token = Cookies.get('jwt_token')

  if (isLoading) {
    // You can return a loading spinner here
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Public route component for unauthenticated users only
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();



  if (isLoading) {
    // You can return a loading spinner here
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};


const PaidUserRoute = ({childer}) => {

  const { isAuthenticated, isLoading, user } = useAuth(); // custom hook

  // Logic - to check the token is present inside the cookies.
  // const token = Cookies.get('jwt_token')

  if (isLoading) {
    // You can return a loading spinner here
    return <div>Loading...</div>;
  }

  if (!isAuthenticated && user.role === "paidUser") {
    return <Navigate to="/login" replace />;
  }
  return children;

}

export {ProtectedRoute, PublicRoute}
