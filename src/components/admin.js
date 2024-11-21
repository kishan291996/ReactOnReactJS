import React, { useState, useEffect } from 'react';
import { logout, isAuthenticated } from '../components/authService';
import { fetchContacts } from '../components/contactService';

const Admin = ({ onLogout }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      const data = await fetchContacts();
      setContacts(data);
    };
    getContacts();
  }, []);

  if (!isAuthenticated()) {
    return <p>You are not authorized to view this page</p>;
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <button onClick={onLogout} className="bg-red-500 text-white py-2 px-4 rounded mb-4">
        Logout
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{contact.name}</td>
              <td className="border px-4 py-2">{contact.email}</td>
              <td className="border px-4 py-2">{contact.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Admin;
