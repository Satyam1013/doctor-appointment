import axiosClient from './axios-client';

export const getCenters = () => {
  return axiosClient.get('/admin/centers');
};
