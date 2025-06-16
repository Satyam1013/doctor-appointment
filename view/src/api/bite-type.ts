import axiosClient from './axios-client';

export const getBiteTypeVideos = () => {
  return axiosClient.get('bite');
};
