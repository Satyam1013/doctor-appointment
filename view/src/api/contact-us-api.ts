import axiosClient from './axios-client';

export const getContactUs = () => {
  return axiosClient.get('/contact-us');
};
