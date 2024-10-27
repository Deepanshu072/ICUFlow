// apiHandler.ts
import apiClient from './apiClient';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any; // Data to be sent in the body (for POST/PUT requests)
  params?: any; // URL query parameters
  headers?: any; // Additional headers
}

export const apiRequest = async (url: string, options: ApiOptions = {}) => {
  const { method = 'GET', data = null, params = null, headers = {} } = options;
  
  try {
    const response = await apiClient({
      url,
      method,
      data,
      params,
      headers: {
        ...headers, // Merge additional headers if any
      },
    });
    return response.data; // Return the data part of the response
  } catch (error) {
    // Handle the error or throw it back to be caught in the component
    throw error;
  }
};
