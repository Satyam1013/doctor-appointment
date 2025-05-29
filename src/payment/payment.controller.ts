/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/payments/payments.controller.ts
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payment.service';
import { CreateOrderDto, VerifyPaymentDto } from './payment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // assuming JWT auth
import { Request } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-order')
  createOrder(@Body() dto: CreateOrderDto) {
    return this.paymentsService.createOrder(dto.amount, dto.upiId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify')
  verifyPayment(@Body() dto: VerifyPaymentDto, @Req() req: Request) {
    const userId = (req.user as any)._id;
    return this.paymentsService.verifyPayment(
      userId,
      dto.order_id,
      dto.payment_id,
      dto.signature,
    );
  }
}
