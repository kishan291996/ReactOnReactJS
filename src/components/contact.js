import React, { useState } from 'react';
import { submitContactForm } from './contactService';


const Contact = () => {

    const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [message, setMessage] = useState(''); const [success, setSuccess] = useState(false); const handleSubmit = async (e) => { e.preventDefault(); const formData = { name, email, message }; const result = await submitContactForm(formData); if (result) { setSuccess(true); setName(''); setEmail(''); setMessage(''); } else { console.error('Failed to submit form'); } };
    
  return (
    <main className="p-4"> <h1 className="text-2xl font-bold mb-4">Contact Us</h1> <form onSubmit={handleSubmit} className="mx-auto"> {success && <p className="text-green-500 mb-4">Your message has been sent!</p>} <div className="mb-4"> <label className="block text-gray-700">Name</label> <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded" required /> </div> <div className="mb-4"> <label className="block text-gray-700">Email</label> <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded" required /> </div> <div className="mb-4"> <label className="block text-gray-700">Message</label> <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-3 py-2 border rounded" required ></textarea> </div> <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"> Send </button> </form> </main>
  );
};

export default Contact;
