import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { PaymentsController } from './payment.controller';
import { RazorpayService } from './razorpay.service';
import { PaymentsService } from './payment.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [PaymentsController],
  providers: [RazorpayService, PaymentsService],
})
export class PaymentsModule {}
