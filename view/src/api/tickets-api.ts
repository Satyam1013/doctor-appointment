/* eslint-disable @typescript-eslint/no-unsafe-return */
import axiosClient from './axios-client';

export const getTicket = () => {
  return axiosClient.get('/tickets');
};

export const uploadReportImage = async (formData: FormData) => {
  const response = await axiosClient.post('/tickets', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
