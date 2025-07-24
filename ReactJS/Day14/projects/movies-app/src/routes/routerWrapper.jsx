import { ProtectedRoute, PublicRoute } from "./routing";

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


export default RouteWrapper
