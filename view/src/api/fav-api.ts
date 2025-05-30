import axiosClient from './axios-client';

export const addToFavorite = (productId: string) => {
  return axiosClient.post('/favorite/add', {
    productId,
  });
};

export const getFavorites = () => {
  return axiosClient.get('/favorite');
};

export const removeFavoriteItem = (productId: string) => {
  return axiosClient.delete(`/favorite/${productId}`);
};

export const clearFavorites = () => {
  return axiosClient.delete('/favorite/clear');
};
