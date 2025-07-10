// src/routes/ContactPage.js
import React from 'react';
import { useParams } from 'react-router';

function ContactPage() {
  const { id } = useParams(); // Access the route parameter

  return (
    <div>
      <h2>Contact Page</h2>
      <p>Contact ID: {id}</p>
    </div>
  );
}

export default ContactPage;
