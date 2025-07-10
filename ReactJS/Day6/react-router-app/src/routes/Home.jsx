import { useLoaderData } from 'react-router';

export async function loader() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export default function Home() {
  const users = useLoaderData();
  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}
