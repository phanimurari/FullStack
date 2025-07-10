import { Outlet, Link } from 'react-router';

export default function MainLayout() {
  return (
    <div>
      <h1>Main Layout</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
