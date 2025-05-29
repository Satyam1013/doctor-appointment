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
}

export const UserSchema = SchemaFactory.createForClass(User);
