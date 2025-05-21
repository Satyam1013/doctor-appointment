import axiosClient from './axios-client';

export const uploadCarouselImage = (file: File, type: 'top' | 'bottom') => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('type', type);

  return axiosClient.post('/admin/carousels', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const uploadMultipleCarouselImages = (
  files: File[],
  type: 'top' | 'bottom',
) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('images', file));
  formData.append('type', type);

  return axiosClient.post('/admin/carousels/multiple', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getCarousels = () => {
  return axiosClient.get('/admin/carousels');
};

export const deleteCarouselImage = (id: string) => {
  return axiosClient.delete(`/admin/carousels/${id}`);
};
