import React, { useState } from 'react';
import { registerUser } from '../components/userService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await registerUser(username, password);
      setMessage(result);
      setUsername('');
      setPassword('');
      navigate('/loginU')
    } catch (error) {
      setMessage(error.message);
    }
  };

  const alreadyRegistered = async (e)=>{
    navigate('/loginU')
  }
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {message && <p>{message}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Register
        </button>
        <span>Already Registered ?</span>
        <button type="submit" onClick={alreadyRegistered} className="bg-blue-500 text-white py-2 px-4 rounded">
            Sign In
        </button>
      </form>
    </main>
  );
};

export default Register;
