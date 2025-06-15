import axiosClient from './axios-client';

export const getUserMeets = (userId: string) => {
  return axiosClient.get(`/meet/user/${userId}`);
};
