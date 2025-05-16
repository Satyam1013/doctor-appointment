import axiosClient from './axios-client';

export const addToCart = (productId: string, quantity: number) => {
  return axiosClient.post('/cart/add', {
    productId,
    quantity,
  });
};

export const getCart = () => {
  return axiosClient.get('/cart');
};

export const updateCartItem = (id: string, quantity: number) => {
  return axiosClient.patch(`/cart/update/${id}`, { quantity });
};

export const removeCartItem = (id: string) => {
  return axiosClient.delete(`/cart/${id}`);
};

export const clearCart = () => {
  return axiosClient.delete('/cart/clear');
};
