import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const menuItems = [
  { name: 'Register', path: '/', exact: true },
  { name: 'Home', path: 'home' },
  { name: 'Create Project', path: '/create-project' },
  { name: 'Projects', path: '/projectDetails' },
  { name: 'View Status', path: '/taskViewStatus' },
  { name: 'Employee', path: '/employeeMain' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
  { name: 'Admin', path: '/login' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold" style={{ margin: '0px 0px 0px 50px' }}>
          Information Technology
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <nav className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.exact || false}
              className={({ isActive }) => (isActive ? 'text-white' : 'text-gray-300 hover:text-white')}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
