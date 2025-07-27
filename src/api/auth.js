import axios from 'axios';

export const login = async (credentials) => {
  const response = await axios.post('/auth/login', credentials);
  return response.data;
};

export const getProtectedData = async (token) => {
  const response = await axios.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};