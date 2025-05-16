import axiosClient from './axios-client';

export const addToCart = (
  userId: string,
  productId: string,
  quantity: number,
) => {
  return axiosClient.post('/cart/add', {
    userId,
    productId,
    quantity,
  });
};

export const getCart = (userId: string) => {
  return axiosClient.get(`/cart/${userId}`);
};

export const updateCartItem = (id: number, quantity: number) => {
  return axiosClient.patch(`/cart/update/${id}`, { quantity });
};

export const removeCartItem = (id: number) => {
  return axiosClient.delete(`/cart/${id}`);
};

export const clearCart = (userId: string) => {
  return axiosClient.delete(`/cart/clear/${userId}`);
};
