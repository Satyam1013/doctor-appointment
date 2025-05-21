import axiosClient from './axios-client';

export const uploadCenterImage = (file: File, name: string) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('name', name);

  return axiosClient.post('/admin/centers/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getCenters = () => {
  return axiosClient.get('/admin/centers');
};

export const deleteCenter = (id: string) => {
  return axiosClient.delete(`/admin/centers/${id}`);
};
