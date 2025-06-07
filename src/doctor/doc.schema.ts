import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Doctor extends Document {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true })
  name!: string;

  @Prop()
  mobile!: string;

  @Prop()
  place!: string;

  @Prop()
  specialization!: string;

  @Prop()
  languages!: string[];

  @Prop({ required: true })
  dciRegistrationNumber!: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
