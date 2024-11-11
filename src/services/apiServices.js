import axiosInstance from '../axiosConfig';

const API_URL = 'https://jsonplaceholder.typicode.com/posts'; 

const getData = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const postData = async (data) => {
  try {
    const response = await axiosInstance.post(API_URL, data);
    return response.data;
  } catch (error) { throw error; }
};

export {getData,postData};

