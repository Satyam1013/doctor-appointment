import axiosClient from './axios-client';

export const uploadReportImage = (formData: FormData) => {
  return axiosClient.post('/report', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getMyReports = () => {
  return axiosClient.get('/report/user-report');
};
