import axiosClient from './axios-client';

export const getAligners = () => {
  return axiosClient.get('admin/mydent-aligners');
};
