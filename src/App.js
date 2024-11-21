// src/App.js
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import FormComponent from './formComponent';
import TableComponent from './tableComponent';
import Registration from './Registration';
import Login from './components/login';
import { GlobalProvider, useGlobalContext } from './GlobalState';
import CrudApp from './crudOperation';
import ControlledForm from './controlledForm_reactiveForm';
import { Provider } from 'react-redux';
import store from './store';
import RecordsList from './recordList';
import ValidatedForm from './reactForms';
import Home from './components/home';
import Header from '../src/components/header'; 
import Footer from '../src/components/footer'; 
import About from './components/about';
import Contact from './components/contact';
import Services from './components/services';
import { isAuthenticated } from './components/authService';
import Admin from './components/admin';
import Register from './components/registerUser';
import LoginU from './components/loginUser';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated()); const handleLogin = () => { setLoggedIn(true); }; const handleLogout = () => { localStorage.removeItem('admin'); setLoggedIn(false); };

  const { formData, addFormData } = useGlobalContext();

  const handleFormSubmit = (data) => {
    addFormData(data);
  };

  return (
    <Provider store={store}>
    <Router>
      <div className="app-container">
        <Header/>
        {/* <header className="header">
          <h3>ReactJs Web App</h3>
        </header> */}
        <main className="main-content">
          {/* <h1>Form Application</h1> */}
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/loginU" element={<LoginU />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/admin" element={loggedIn ? <Admin onLogout={handleLogout} /> : <Navigate to="/login" />} />
            {/* <Route path="/" element={<ValidatedForm />} /> */}
            {/* <Route path="/" element={<ControlledForm />} /> */}
            <Route path="/edit/:id" element={<ControlledForm />} />
            <Route path="/records" element={<RecordsList />} />
            <Route path="/curdApp" element={<CrudApp />} />
            <Route path="/reg" element={<Registration />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/form" element={<FormComponent onSubmit={handleFormSubmit} />} />
            <Route path="/table" element={<TableComponent data={formData} />} />
          </Routes>
        </main>
        <Footer/>
        {/* <footer className="footer">
          <p>Developed By: Kishan Mehta&nbsp;</p>
        </footer> */}
      </div>
    </Router>
    </Provider>
  );
};

export default () => (
  <GlobalProvider>
    <App />
  </GlobalProvider>
);
