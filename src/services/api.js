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
    const responseData = response.data; // Return response to be handled elsewhere
    // if (responseData.status !== 'success') {
    //   throw new Error(responseData.message);
    // }
    return responseData;
  } catch (error) {
    let errorMessage = 'Something went wrong';
    if (error.response) {
      errorMessage = error.response.data?.message || error.message;
    } else if (error.request) {
      errorMessage = 'No response received from server';
    } else {
      errorMessage = error.message;
    }
    console.error('API request error: ', error);
    // alert(errorMessage); // Show alert with the error message
    throw new Error(errorMessage);
  }
};

export default apiRequest;
