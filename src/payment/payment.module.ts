import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { PaymentsController } from './payment.controller';
import { RazorpayService } from './razorpay.service';
import { PaymentsService } from './payment.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
  ],
  controllers: [PaymentsController],
  providers: [RazorpayService, PaymentsService],
})
export class PaymentsModule {}
