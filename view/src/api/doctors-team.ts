import axiosClient from './axios-client';

export const getDoctorTeams = () => {
  return axiosClient.get('/team');
};
