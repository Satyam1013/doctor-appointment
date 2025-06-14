import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Meet extends Document {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  doctorId!: string;

  @Prop({ required: true })
  meetLink!: string;

  @Prop({ required: true })
  date!: string;

  @Prop({ required: true })
  time!: string;
}

export const MeetSchema = SchemaFactory.createForClass(Meet);
