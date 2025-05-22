import axiosClient from './axios-client';

export const getAllBlogs = () => {
  return axiosClient.get('/admin/blogs');
};
