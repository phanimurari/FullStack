// src/App.js
import { Outlet, Link } from 'react-router';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/about">About</Link> |{' '}
        <Link to="/contact">Contact</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
