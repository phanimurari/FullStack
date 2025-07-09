import { getContact, updateContact } from "../data";
import { Form, useFetcher } from "react-router";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) throw new Response("Not Found", { status: 404 });
  return { contact };
}

export async function action({ params, request }) {
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Contact({ loaderData }) {
  const { contact } = loaderData;
  return (
    <div id="contact">
      <div>
        <img alt={`${contact.first} ${contact.last}`} src={contact.avatar || "https://placekitten.com/200/200"} />
      </div>
      <div>
        <h1>
          {contact.first || contact.last ? `${contact.first} ${contact.last}` : <i>No Name</i>}
          <Favorite contact={contact} />
        </h1>
        <Form action="edit"><button>Edit</button></Form>
        <Form action="destroy" method="post" onSubmit={e => {
          if (!confirm("Delete this contact?")) e.preventDefault();
        }}>
          <button>Delete</button>
        </Form>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;

  return (
    <fetcher.Form method="post">
      <button name="favorite" value={favorite ? "false" : "true"}>
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
