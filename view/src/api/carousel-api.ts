import axiosClient from './axios-client';

export const getCarousels = () => {
  return axiosClient.get('/carousels');
};
