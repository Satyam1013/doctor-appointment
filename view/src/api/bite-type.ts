import axiosClient from './axios-client';

export const getBiteType = () => {
  return axiosClient.get('bite');
};
