import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your backend API URL
  timeout: 10000, // Request timeout,
  withCredentials: true, // Include cookies in requests if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example of setting up an interceptor for requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Example of setting up an interceptor for responses
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const { data } = await api.post('/auth/refresh-token', {
          // Include necessary data for token refresh
        });
        api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        originalConfig.headers['Authorization'] = `Bearer ${data.accessToken}`;

        localStorage.setItem('accessToken', data.accessToken);

        return api(originalConfig);
      } catch (refreshError) {
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(err);
  }
);

export default api;