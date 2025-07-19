import { Outlet, Link, Navigate } from 'react-router-dom';
import './App.css';
// import { AuthProvider, AuthContext } from './AuthContext';
import { useContext } from 'react';

function App() {
  return (
      <div>
        <Outlet />
      </div>
  );
}

export default App;
