import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://doctor-appointment-5j6e.onrender.com',
});

export default axiosClient;
