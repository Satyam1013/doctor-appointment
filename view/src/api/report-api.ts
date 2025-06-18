import axiosClient from './axios-client';

export const uploadReportImage = (formData: FormData) => {
  return axiosClient.post('/report', formData);
};

export const getMyReports = () => {
  return axiosClient.get('/report/user-report');
};
