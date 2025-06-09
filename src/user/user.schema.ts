import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

class AssignedDoctor {
  @Prop({ type: Types.ObjectId, ref: 'Doctor', required: true })
  doctorId!: Types.ObjectId;

  @Prop({ type: Number, enum: [1, 2, 3, 4], required: true })
  step!: number;

  @Prop({ type: Date, default: Date.now })
  assignedAt!: Date;
}

const AssignedDoctorSchema = SchemaFactory.createForClass(AssignedDoctor);

@Schema()
export class User {
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

  @Prop()
  ageGroup?: string;

  @Prop()
  teethIssue?: string;

  @Prop()
  problemText?: string;

  @Prop({ type: [String], default: [] })
  medicalHistory?: string[];

  @Prop()
  gender?: string;

  @Prop()
  smoker?: string;

  @Prop()
  availability?: string;

  // Embedded object for doctor assignment
  @Prop({ type: AssignedDoctorSchema, required: false })
  assignedDoctor?: AssignedDoctor;
}

export const UserSchema = SchemaFactory.createForClass(User);
