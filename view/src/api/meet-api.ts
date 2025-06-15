import axiosClient from './axios-client';

export const getUserMeets = () => {
  return axiosClient.get(`/meet/user`);
};
