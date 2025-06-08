

import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://172.20.10.2:5555',
  baseURL: 'https://fullstack-project-4qj2.onrender.com', 
  withCredentials: true,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
