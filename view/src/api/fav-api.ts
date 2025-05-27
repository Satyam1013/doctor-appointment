import axiosClient from './axios-client';

export const addToFavorite = (productId: string) => {
  return axiosClient.post('/favorite/add', {
    productId,
  });
};

export const getFavorites = () => {
  return axiosClient.get('/favorite');
};

export const removeFavoriteItem = (id: string) => {
  return axiosClient.delete(`/favorite/${id}`);
};

export const clearFavorites = () => {
  return axiosClient.delete('/favorite/clear');
};
