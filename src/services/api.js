/**
 * API service to make requests to the backend
 */
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const apiRequest = async (method, endpoint, data) => {
  try {
    const response = await apiClient({
      method,
      url: endpoint,
      data,
    });
    return response; // Return response to be handled elsewhere
  } catch (error) {
    console.error('API request error: ', error.response || error.message);
    throw new Error(
      error.response?.data?.message || error.message || 'Something went wrong'
    );
  }
};

export default apiRequest;
