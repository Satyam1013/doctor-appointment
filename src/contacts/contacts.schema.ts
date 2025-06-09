import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ContactUs {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  message!: string;

  @Prop()
  video?: string;
}

export type ContactUsDocument = ContactUs & Document;
export const ContactUsSchema = SchemaFactory.createForClass(ContactUs);
