import { getContact, updateContact } from "../data";
import { Form, redirect, useNavigate } from "react-router";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) throw new Response("Not Found", { status: 404 });
  return { contact };
}

export async function action({ params, request }) {
  const updates = Object.fromEntries(await request.formData());
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact({ loaderData }) {
  const { contact } = loaderData;
  const navigate = useNavigate();

  return (
    <Form method="post">
      <p><input name="first" defaultValue={contact.first} placeholder="First" /></p>
      <p><input name="last" defaultValue={contact.last} placeholder="Last" /></p>
      <p><button type="submit">Save</button>
      <button type="button" onClick={() => navigate(-1)}>Cancel</button></p>
    </Form>
  );
}
