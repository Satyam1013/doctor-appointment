// src/payments/razorpay.service.ts
import { Injectable } from '@nestjs/common';
import Razorpay from 'razorpay';
import * as crypto from 'crypto';

@Injectable()
export class RazorpayService {
  private razorpay: Razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
  }

  createOrder(amount: number) {
    const options = {
      amount: amount * 100, // convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };
    return this.razorpay.orders.create(options);
  }

  verifySignature(
    order_id: string,
    payment_id: string,
    signature: string,
  ): boolean {
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${order_id}|${payment_id}`)
      .digest('hex');

    return generatedSignature === signature;
  }

  fetchOrder(orderId: string) {
    return this.razorpay.orders.fetch(orderId);
  }
}
