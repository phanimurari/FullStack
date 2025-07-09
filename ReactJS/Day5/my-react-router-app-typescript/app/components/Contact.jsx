// import { Link } from "react-router"

// const Contact = () => <>
// <h1>This! Contact Page</h1>
// <Link to="/">Click here for Home Page</Link>
// </>

// export default Contact

const getConatct = (conatctId) => {
 console.log(conatctId, "contactId")
 return conatctId
} 


export async function loader({ params }) {
  const contact = await getConatct(params.contactId);
  return { contact };
}

export default function Contact({ loaderData }) {
  const { contact } = loaderData;
  return <h1>{contact.name}</h1>;
}