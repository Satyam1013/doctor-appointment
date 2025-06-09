import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

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

  @Prop({
    type: {
      doctorId: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
      },
      step: { type: Number, enum: [1, 2, 3, 4], required: true },
      assignedAt: { type: Date, required: true },
    },
  })
  assignedDoctor?: {
    doctorId: Types.ObjectId;
    step: number;
    assignedAt: Date;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
