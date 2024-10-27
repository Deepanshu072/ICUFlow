import axios from 'axios';

// Create an instance of axios
const apiClient = axios.create({
  baseURL: 'https://api-testing.diagna.icu/mimic/api/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

// Function to set Authorization or other dynamic headers
apiClient.interceptors.request.use(config => {

  return config;
}, error => {
  return Promise.reject(error);
});

export default apiClient;
