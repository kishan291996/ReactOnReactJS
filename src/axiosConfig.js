// src/services/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Replace with your API base URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Server Error:', error.response.data);
      alert(`Server Error: ${error.response.data.message}`);
    } else if (error.request) {
      // No response was received from the server
      console.error('Network Error:', error.request);
      alert('Network Error: Please check your connection.');
    } else {
      // Some other error occurred
      console.error('Error:', error.message);
      alert(`Error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
