import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { AssignedUserStatus, PaymentStatus } from 'src/common/auth-req';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: false })
  resetPasswordToken?: string;

  @Prop({ required: false })
  resetPasswordExpires?: Date;

  @Prop() firstName!: string;
  @Prop() password!: string;
  @Prop({ required: true }) mobile!: string;
  @Prop({ type: Number, default: 0 }) balance!: number;
  @Prop() ageGroup?: string;
  @Prop() teethIssue?: string;
  @Prop() problemText?: string;
  @Prop({ type: [String], default: [] }) medicalHistory?: string[];
  @Prop() gender?: string;
  @Prop() smoker?: string;
  @Prop() role?: string;
  @Prop() availability?: string;

  @Prop({
    type: String,
    enum: PaymentStatus,
    default: PaymentStatus.UNPAID,
  })
  paid?: PaymentStatus;

  @Prop({
    type: {
      doctorId: { type: Types.ObjectId, ref: 'Doctor', required: true },
      step: { type: Number, enum: [1, 2, 3, 4], required: true },
      assignedAt: { type: Date, required: true },
      status: {
        type: String,
        enum: Object.values(AssignedUserStatus),
        required: true,
        default: AssignedUserStatus.PENDING,
      },
    },
  })
  assignedDoctor?: {
    doctorId: Types.ObjectId;
    step: number;
    assignedAt: Date;
    status: AssignedUserStatus;
  };

  @Prop({
    type: [
      {
        team: { type: Types.ObjectId, ref: 'DoctorsTeam', required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
      },
    ],
    default: [],
  })
  doctorsTeam!: {
    team: Types.ObjectId;
    date: string;
    time: string;
  }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
