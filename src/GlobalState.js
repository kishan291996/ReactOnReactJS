// src/GlobalState.js
import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [formData, setFormData] = useState([]);
  const [user, setUser] = useState(null);

  const addFormData = (data) => {
    setFormData([...formData, data]);
  };

  const registerUser = (newUser) => {
    setUser(newUser);
  };

  const loginUser = (username, password) => {
    if (user && user.username === username && user.password === password) {
      return true;
    }
    return false;
  };

  return (
    <GlobalContext.Provider value={{ formData, addFormData, registerUser, loginUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
