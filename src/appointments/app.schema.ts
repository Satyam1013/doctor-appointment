// appointments/appointment.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ type: Types.ObjectId, ref: 'Doctor', required: true })
  doctorId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ enum: ['pending', 'scanned', 'done'], default: 'pending' })
  status!: string;

  @Prop({ enum: ['pending', 'paid'], default: 'pending' })
  paymentStatus!: string;

  @Prop()
  amount?: number;

  @Prop()
  appointmentDate!: Date;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
