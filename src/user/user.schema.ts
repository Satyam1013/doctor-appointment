import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  password: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: false })
  isGoogle: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
