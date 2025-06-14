import axiosClient from './axios-client';

export const getExperts = () => {
  return axiosClient.get('/experts');
};
