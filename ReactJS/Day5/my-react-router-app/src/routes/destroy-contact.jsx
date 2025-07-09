import { deleteContact } from "../data";
import { redirect } from "react-router";

export async function action({ params }) {
  await deleteContact(params.contactId);
  return redirect("/");
}
