import axiosClient from './axios-client';

export const signup = (data: {
  email: string;
  firstName: string;
  password: string;
  mobile: string;
}) => axiosClient.post('/auth/signup/user', data);

export const login = (data: { email: string; password: string }) =>
  axiosClient.post('/auth/login/user', data);

// Forgot password: Send email with token
export const forgotPassword = (email: string) =>
  axiosClient.post('/auth/forgot-password', { email });

// Reset password: Use token + new password
export const resetPassword = (token: string, newPassword: string) =>
  axiosClient.post('/auth/reset-password', { token, newPassword });
