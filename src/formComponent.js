// src/FormComponent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormComponent = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    address: '',
    phone: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    navigate('/table');
  };

  return (
    <form onSubmit={handleSubmit}>
    <h1>Fill Application Form</h1>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required />
      <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
      <button type="submit">Submit</button>
    </form>    
  );
};

export default FormComponent;
