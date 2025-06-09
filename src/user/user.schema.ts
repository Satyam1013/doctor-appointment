import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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

  // ✅ Assigned doctor and step number
  @Prop({ type: Types.ObjectId, ref: 'Doctor' })
  assignedDoctor?: Types.ObjectId;

  @Prop({ type: Number, enum: [1, 2, 3, 4], default: 1 })
  currentStep?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
