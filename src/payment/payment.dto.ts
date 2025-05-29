import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  amount!: number;

  @IsString()
  upiId!: string;
}

export class VerifyPaymentDto {
  @IsString()
  order_id!: string;

  @IsString()
  payment_id!: string;

  @IsString()
  signature!: string;
}
