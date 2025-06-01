import axiosClient from './axios-client';

export const getUserDetails = () => {
  return axiosClient.get('/users/details');
};

export const getAllUsers = () => {
  return axiosClient.get('/users');
};

export const updateUser = (
  updates: Partial<{
    firstName: string;
    email: string;
    mobile: string;
    ageGroup: string;
    teethIssue: string;
    problemText: string;
    medicalHistory: string[];
    gender: string;
    smoker: string;
    availability: string;
  }>,
) => {
  return axiosClient.patch('/users/edit', updates);
};
