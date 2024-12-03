import React, { useState } from 'react';
import { addEmployee } from '../components/employeeService';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import icons from react-icons library

const EmployeeForm = ({ onAddEmployee }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState('');
  const [assignedProject, setAssignedProject] = useState('');
  const [manager, setManager] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmployee = { name, contact, email, skills, assignedProject, manager };
    try {
      await addEmployee(newEmployee);
      onAddEmployee(newEmployee);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
    setName('');
    setContact('');
    setEmail('');
    setSkills('');
    setAssignedProject('');
    setManager('');
    setIsExpanded(false); // Collapse the form after submission
  };

  return (
    <div className="bg-white p-4 border border-gray-200 rounded mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">Add Employee</h3>
        <span
          className="text-blue-500"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {isExpanded && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contact No</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Skill Set</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Assigned Project</label>
            <input
              type="text"
              value={assignedProject}
              onChange={(e) => setAssignedProject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Manager Name</label>
            <input
              type="text"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
            Add Employee
          </button>
        </form>
      )}
    </div>
  );
};

export default EmployeeForm;
