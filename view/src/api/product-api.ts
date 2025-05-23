/* eslint-disable @typescript-eslint/no-unsafe-return */
import axiosClient from './axios-client';

export const getAllProducts = async () => {
  try {
    const response = await axiosClient.get('/products');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

export const getProductById = async (id: any) => {
  try {
    const response = await axiosClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error);
    throw error;
  }
};

export const toggleFavoriteStatus = async (id: string, isFavorite: boolean) => {
  try {
    const response = await axiosClient.patch(`/products/${id}/favorite`, {
      isFavorite,
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to update favorite status for product ${id}:`, error);
    throw error;
  }
};
