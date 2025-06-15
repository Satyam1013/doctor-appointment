import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { AssignedUserStatus } from 'src/common/auth-req';

export type DoctorDocument = HydratedDocument<Doctor>;

@Schema({ timestamps: true })
export class Doctor {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true })
  name!: string;

  @Prop() mobile!: string;
  @Prop() place!: string;
  @Prop() specialization!: string;
  @Prop() languages!: string[];
  @Prop({ required: true }) dciRegistrationNumber!: string;
  @Prop({
    type: {
      userId: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      passInfo: { type: Boolean, required: true },
      assignedAt: { type: Date, required: true },
      status: {
        type: String,
        enum: Object.values(AssignedUserStatus),
        required: true,
        default: AssignedUserStatus.PENDING,
      },
    },
  })
  assignedUser?: {
    userId: Types.ObjectId;
    passInfo: boolean;
    assignedAt: Date;
    status: AssignedUserStatus;
  };
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
