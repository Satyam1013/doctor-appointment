import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop()
  firstName!: string;

  @Prop()
  password!: string;

  @Prop({ required: true })
  mobile!: string;

  @Prop({ type: Number, default: 0 })
  balance!: number;

  @Prop({ type: String, required: false })
  ageGroup?: string;

  @Prop({ type: String, required: false })
  teethIssue?: string;

  @Prop({ type: String, required: false })
  problemText?: string;

  @Prop({ type: [String], default: [] })
  medicalHistory?: string[];

  @Prop({ type: String, required: false })
  gender?: string;

  @Prop({ type: String, required: false })
  smoker?: string;

  @Prop({ type: String, required: false })
  availability?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
