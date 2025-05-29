/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/payments/payments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { RazorpayService } from './razorpay.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly razorpayService: RazorpayService,
    private readonly userService: UserService,
  ) {}

  async createOrder(amount: number, upiId: string) {
    const order = await this.razorpayService.createOrder(amount);
    return {
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      upiId,
      key_id: process.env.RAZORPAY_KEY_ID,
    };
  }

  async verifyPayment(
    userId: string,
    order_id: string,
    payment_id: string,
    signature: string,
  ) {
    const isValid = this.razorpayService.verifySignature(
      order_id,
      payment_id,
      signature,
    );
    if (!isValid) {
      throw new Error('Invalid signature');
    }

    const order = await this.razorpayService.fetchOrder(order_id);
    if (!order || order.status !== 'paid') {
      throw new Error('Order not found or not paid');
    }

    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const amountInINR = Number(order.amount) / 100;
    user.balance = (user.balance || 0) + amountInINR;
    await user.save();

    return {
      success: true,
      message: '✅ Payment successful!',
      balance: user.balance,
    };
  }
}
