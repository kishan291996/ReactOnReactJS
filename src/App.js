// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormComponent from './formComponent';
import TableComponent from './tableComponent';
import Registration from './Registration';
import Login from './login';
import { GlobalProvider, useGlobalContext } from './GlobalState';

const App = () => {
  const { formData, addFormData } = useGlobalContext();

  const handleFormSubmit = (data) => {
    addFormData(data);
  };

  return (
    <Router>    
      <div className="app-container">
        <header className="header">
          <h1>ReactJs Web App</h1>
        </header>
        <main className="main-content">
        {/* <h1>Form Application</h1> */}
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/form" element={<FormComponent onSubmit={handleFormSubmit} />} />
          <Route path="/table" element={<TableComponent data={formData} />} />
        </Routes>
        </main>
        <footer className="footer">
          <p>Developed By: Kishan Mehta&nbsp;</p>
        </footer>
      </div>
    </Router>
  );
};

export default () => (
  <GlobalProvider>
    <App />
  </GlobalProvider>
);
