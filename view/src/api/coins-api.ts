import axiosClient from './axios-client';

export const getCoins = () => {
  return axiosClient.get('/coins/user');
};
