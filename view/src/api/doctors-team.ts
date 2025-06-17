import axiosClient from './axios-client';

export const getDoctorTeams = (userId: string) => {
  return axiosClient.get(`/team/user/${userId}`);
};
