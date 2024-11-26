import React from 'react';
import { NavLink } from 'react-router-dom';

const menuItems = [ { name: 'Register', path: '/', exact: true }, { name: 'Home', path: 'home' }, { name: 'Create Project', path: '/create-project' }, { name: 'Projects', path: '/projectDetails' }, { name: 'View Status', path: '/taskViewStatus' }, { name: 'About', path: '/about' }, { name: 'Services', path: '/services' }, { name: 'Contact', path: '/contact' }, { name: 'Admin', path: '/login' } ];

const Header = () => {
  return (
    <header className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold" style={{margin: "0px 0px 0px 50px"}}>Information Technology</div>
        <nav className="space-x-4"> {menuItems.map((item) => ( <NavLink key={item.name} to={item.path} end={item.exact || false} className={({ isActive }) => (isActive ? 'text-white' : 'text-gray-300 hover:text-white')} > {item.name} </NavLink> ))} </nav>
      </div>
    </header>
  );
};

export default Header;
    