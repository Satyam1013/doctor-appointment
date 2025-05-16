import axios from 'axios';
import { getToken } from '../utils/storage';

const axiosClient = axios.create({
  baseURL: 'https://doctor-appointment-5j6e.onrender.com',
});

// Attach token from storage to each request
axiosClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
