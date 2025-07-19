// import React, { createContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = Cookies.get('jwt_token');
//     setIsLoggedIn(!!token);
//   }, []);

//   const login = (token) => {
//     Cookies.set('jwt_token', token, { expires: 7 });
//     setIsLoggedIn(true);
//     navigate('/profile'); // Redirect to profile page after login
//   };

//   const logout = () => {
//     Cookies.remove('jwt_token');
//     setIsLoggedIn(false);
//     navigate('/login'); // Redirect to login page after logout
//   };

//   const authContextValue = {
//     isLoggedIn,
//     login,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={authContextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// };