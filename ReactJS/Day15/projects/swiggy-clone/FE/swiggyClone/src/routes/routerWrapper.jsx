import { AdminRoute, ProtectedRoute, PublicRoute } from "./routing";

// Route wrapper component
const RouteWrapper = ({ Component, isProtected, isPublic, isAdmin }) => {
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

  if (isAdmin) {
    return (
      <AdminRoute>
        <Component />
      </AdminRoute>
    );
  }


  // if(isPaiduser) {
  //   return return (
  //     <PaidUserRoute>
  //       <Component />
  //     </PaidUserRoute>
  //   );
  // }
  
  return <Component />;
};


export default RouteWrapper
