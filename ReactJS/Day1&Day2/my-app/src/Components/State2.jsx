import React, { useState } from 'react';
import { User, Phone, Mail, Plus, Trash2, Edit3, Check, X } from 'lucide-react';

const ContactAppV2 = () => {
  // Initial contacts data
  const initialContacts = [
    { id: 1, name: 'John Doe', phone: '+1 (555) 123-4567', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', phone: '+1 (555) 987-6543', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', phone: '+1 (555) 456-7890', email: 'bob@example.com' }
  ];

  // State management with useState
  const [contacts, setContacts] = useState(initialContacts);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // Generate unique ID for new contacts
  const generateId = () => {
    return contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new contact
  const addContact = () => {
    if (formData.name.trim() && formData.phone.trim() && formData.email.trim()) {
      const newContact = {
        id: generateId(),
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim()
      };
      
      setContacts(prev => [...prev, newContact]);
      setFormData({ name: '', phone: '', email: '' });
      setShowForm(false);
    }
  };

  // Delete contact
  const deleteContact = (id) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  // Start editing contact
  const startEdit = (contact) => {
    setEditingId(contact.id);
    setFormData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email
    });
  };

  // Save edited contact
  const saveEdit = () => {
    if (formData.name.trim() && formData.phone.trim() && formData.email.trim()) {
      setContacts(prev => prev.map(contact => 
        contact.id === editingId
          ? { ...contact, ...formData }
          : contact
      ));
      setEditingId(null);
      setFormData({ name: '', phone: '', email: '' });
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', phone: '', email: '' });
  };

  // Contact form component
  const ContactForm = ({ isEditing = false }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {isEditing ? '✏️ Edit Contact' : '➕ Add New Contact'}
      </h3>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex space-x-3">
          <button
            onClick={isEditing ? saveEdit : addContact}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Check className="w-4 h-4 mr-2" />
            {isEditing ? 'Save' : 'Add'}
          </button>
          <button
            onClick={isEditing ? cancelEdit : () => setShowForm(false)}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Individual contact item component
  const ContactItem = ({ contact }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <User className="w-8 h-8 text-blue-600 mr-3" />
          <h3 className="text-xl font-semibold text-gray-800">{contact.name}</h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => startEdit(contact)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteContact(contact.id)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Phone className="w-4 h-4 mr-2" />
          <span>{contact.phone}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          <span>{contact.email}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📱 Dynamic Contact Manager
          </h1>
          <p className="text-lg text-gray-600">
            Advanced React State Management with useState
          </p>
        </div>

        {/* Concept Explanation */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-green-500">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            🎯 Learning Objective: Advanced useState Patterns
          </h2>
          <div className="text-gray-700 space-y-2">
            <p><strong>Multiple State Variables:</strong> Managing different pieces of state independently.</p>
            <p><strong>Complex State Updates:</strong> Adding, editing, and deleting items from arrays.</p>
            <p><strong>Form State:</strong> Handling controlled inputs with useState.</p>
            <p><strong>Conditional Rendering:</strong> Showing/hiding UI based on state.</p>
          </div>
        </div>

        {/* Code Example Display */}
        <div className="bg-gray-900 text-green-400 p-6 rounded-lg mb-8 overflow-x-auto">
          <h3 className="text-white font-semibold mb-3">💻 Code Examples:</h3>
          <pre className="text-sm">
{`// Multiple state variables
const [contacts, setContacts] = useState(initialContacts);
const [showForm, setShowForm] = useState(false);
const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

// Adding to array state
const addContact = () => {
  setContacts(prev => [...prev, newContact]);  // ✅ Spread operator
};

// Removing from array state
const deleteContact = (id) => {
  setContacts(prev => prev.filter(contact => contact.id !== id));
};

// Updating array state
const updateContact = (id, updates) => {
  setContacts(prev => prev.map(contact => 
    contact.id === id ? { ...contact, ...updates } : contact
  ));
};`}
          </pre>
        </div>

        {/* State Dashboard */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">📊 State Dashboard</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{contacts.length}</div>
              <div className="text-blue-800">Total Contacts</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{showForm ? 'Open' : 'Closed'}</div>
              <div className="text-green-800">Add Form</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{editingId ? 'Yes' : 'No'}</div>
              <div className="text-purple-800">Editing Mode</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {formData.name || formData.phone || formData.email ? 'Has Data' : 'Empty'}
              </div>
              <div className="text-yellow-800">Form State</div>
            </div>
          </div>
        </div>

        {/* Add Contact Button */}
        {!showForm && !editingId && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg mx-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Contact
            </button>
          </div>
        )}

        {/* Contact Form (Add or Edit) */}
        {(showForm || editingId) && (
          <div className="mb-8">
            <ContactForm isEditing={editingId !== null} />
          </div>
        )}

        {/* Contact List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {contacts.map((contact) => (
            <ContactItem 
              key={contact.id}
              contact={contact}
            />
          ))}
        </div>

        {/* Empty State */}
        {contacts.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Contacts Yet</h3>
            <p className="text-gray-500">Add your first contact to get started!</p>
          </div>
        )}

        {/* Footer with Key Takeaways */}
        <div className="bg-green-900 text-white p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">🔑 Advanced useState Patterns:</h3>
          <ul className="space-y-2">
            <li>• <strong>Array State:</strong> Use spread operator <code className="bg-green-800 px-2 py-1 rounded">[...prev, newItem]</code> to add items</li>
            <li>• <strong>Object State:</strong> Use spread operator <code className="bg-green-800 px-2 py-1 rounded">{'...prev, newProp: value'}</code> to update</li>
            <li>• <strong>Multiple States:</strong> Use separate useState calls for different concerns</li>
            <li>• <strong>Conditional Rendering:</strong> Show/hide UI based on state values</li>
            <li>• <strong>Form Handling:</strong> Control inputs with state and onChange handlers</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactAppV2;