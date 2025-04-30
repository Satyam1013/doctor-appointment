import axiosClient from './axios-client';

export const signup = (data: {
  email: string;
  firstName: string;
  password: string;
}) => axiosClient.post('/auth/signup/user', data);

export const login = (data: { email: string; password: string }) =>
  axiosClient.post('/auth/login/user', data);
