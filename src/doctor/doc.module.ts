import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from './doc.schema';
import { DoctorService } from './doc.service';
import { UserModule } from 'src/user/user.module';
import { AppointmentModule } from 'src/appointments/app.module';
import { ReviewModule } from 'src/review/doc.module';
import { DoctorController } from './doc.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }]),
    UserModule,
    ReviewModule,
    AppointmentModule,
  ],
  providers: [DoctorService],
  controllers: [DoctorController],
  exports: [DoctorService],
})
export class DoctorModule {}
