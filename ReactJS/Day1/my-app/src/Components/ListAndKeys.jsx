import React from 'react';

const ContactApp = () => {
  // Sample contact data
  const contacts = [
    { id: 1, name: 'John Doe', phone: '+1 (555) 123-4567', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', phone: '+1 (555) 987-6543', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', phone: '+1 (555) 456-7890', email: 'bob@example.com' },
    { id: 4, name: 'Alice Brown', phone: '+1 (555) 321-0987', email: 'alice@example.com' },
    { id: 5, name: 'Charlie Wilson', phone: '+1 (555) 654-3210', email: 'charlie@example.com' }
  ];

  // Contact component for individual contact items
  const ContactItem = ({ contact }) => (
    <li className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mr-3">
          👤
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{contact.name}</h3>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <span className="w-4 h-4 mr-2 text-blue-600">📞</span>
          <span>{contact.phone}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <span className="w-4 h-4 mr-2 text-blue-600">✉️</span>
          <span>{contact.email}</span>
        </div>
      </div>
    </li>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📱 Contact Directory
          </h1>
          <p className="text-lg text-gray-600">
            Demonstrating React Lists & Keys
          </p>
        </div>

        {/* Concept Explanation */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-blue-500">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            🎯 Learning Objective: React Lists & Keys
          </h2>
          <div className="text-gray-700 space-y-2">
            <p><strong>Key Concept:</strong> When rendering lists in React, each item needs a unique "key" prop.</p>
            <p><strong>Why Keys Matter:</strong> Keys help React identify which items have changed, been added, or removed.</p>
            <p><strong>Best Practice:</strong> Use stable, unique IDs as keys (not array indices when possible).</p>
          </div>
        </div>

        {/* Code Example Display */}
        <div className="bg-gray-900 text-green-400 p-6 rounded-lg mb-8 overflow-x-auto">
          <h3 className="text-white font-semibold mb-3">💻 Code Example:</h3>
          <pre className="text-sm">
{`// Correct way to render lists with keys
{contacts.map((contact) => (
  <ContactItem 
    key={contact.id}        // ✅ Unique key
    contact={contact} 
  />
))}

// Wrong way (avoid this)
{contacts.map((contact, index) => (
  <ContactItem 
    key={index}            // ❌ Array index as key
    contact={contact} 
  />
))}`}
          </pre>
        </div>

        {/* Contact List */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.map((contact) => (
            <ContactItem 
              key={contact.id}  // ✅ Each contact has a unique key
              contact={contact} 
            />
          ))}
        </ul>

        {/* Footer with Key Takeaways */}
        <div className="mt-12 bg-blue-900 text-white p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">🔑 Key Takeaways:</h3>
          <ul className="space-y-2">
            <li>• Always provide a unique <code className="bg-blue-800 px-2 py-1 rounded">key</code> prop when rendering lists</li>
            <li>• Use stable, unique identifiers (like IDs) as keys</li>
            <li>• Keys help React efficiently update the DOM when lists change</li>
            <li>• Avoid using array indices as keys for dynamic lists</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactApp;




// import { Component } from 'react';

// class MyComponentName extends Component {

//     state  {}

//     constructor() {

//     }

//     componentDidMount() {

//     }

//     componentDidCatch() {

//     }

//     render() {
//         return <h1>JSX</h1>
//     }
// }

// export default MyComponent