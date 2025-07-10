import { Form, useActionData } from 'react-router';

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get('name');

  // Simulate POST to placeholder
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({ title: name }),
    headers: { 'Content-Type': 'application/json' },
  });

  const result = await res.json();
  return { success: true, response: result };
}

export default function Contact() {
  const data = useActionData();

  return (
    <div>
      <h2>Contact Form</h2>
      <Form method="post">
        <input name="name" placeholder="Enter your name" required />
        <button type="submit">Submit</button>
      </Form>

      {data?.success && (
        <div style={{ marginTop: '1em', color: 'green' }}>
          ✅ Submitted! Server responded with ID: {data.response.id}
        </div>
      )}
    </div>
  );
}
