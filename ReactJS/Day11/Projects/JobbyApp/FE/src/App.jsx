import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div className="app">
      {/* Common layout components like header, navigation can go here */}
      <Outlet />
    </div>
  );
};

export default App;