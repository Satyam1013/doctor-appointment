import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AppointmentDocument = HydratedDocument<Appointment>;

export enum AppointmentStatus {
  PENDING = 'pending',
  SCANNED = 'scanned',
  DONE = 'done',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
}

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ type: Types.ObjectId, ref: 'Doctor', required: true })
  doctorId!: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'DoctorsTeam' }], default: [] })
  doctorsTeam?: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ enum: AppointmentStatus, default: AppointmentStatus.PENDING })
  status!: AppointmentStatus;

  @Prop({ enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus!: PaymentStatus;

  @Prop()
  amount?: number;

  @Prop()
  appointmentDate!: Date;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
