import { getContacts } from "../data";
import {
  Form, NavLink, Outlet, useNavigation, useSubmit
} from "react-router";
import { useEffect } from "react";

export async function loader({ request }) {
  const q = new URL(request.url).searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export default function Sidebar({ loaderData }) {
  const { contacts, q } = loaderData;
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>Contact App</h1>
        <Form
          id="search-form"
          role="search"
          onChange={(e) => {
            const isFirstSearch = q === null;
            submit(e.currentTarget, { replace: !isFirstSearch });
          }}
        >
          <input id="q" name="q" placeholder="Search" defaultValue={q || ""} />
        </Form>
        <Form method="post">
          <button type="submit">New</button>
        </Form>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map(c => (
                <li key={c.id}>
                  <NavLink to={`contacts/${c.id}`}>
                    {c.first || c.last ? `${c.first} ${c.last}` : <i>No Name</i>}
                    {c.favorite ? " ★" : ""}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : <p><i>No contacts</i></p>}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
