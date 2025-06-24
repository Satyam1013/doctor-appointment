/* eslint-disable @typescript-eslint/no-unsafe-return */
import axiosClient from './axios-client';

interface CreateOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

interface VerifyPaymentPayload {
  order_id: string;
  payment_id: string;
  signature: string;
}

export const createOrder = async (
  amount: number,
): Promise<CreateOrderResponse> => {
  const response = await axiosClient.post('/payments/create-order', {
    amount,
  });
  return response.data;
};

export const verifyPayment = async (
  data: VerifyPaymentPayload,
): Promise<any> => {
  const response = await axiosClient.post('/payments/verify', data);
  return response.data;
};
