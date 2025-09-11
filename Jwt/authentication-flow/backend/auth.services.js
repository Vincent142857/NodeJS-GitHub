import api from './api.js';

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  localStorage.setItem('accessToken', response.data.accessToken);
  return response.data;
}

