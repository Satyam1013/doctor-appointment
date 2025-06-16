import axiosClient from './axios-client';

export const getLatestBlogs = () => {
  return axiosClient.get('/blogs');
};
