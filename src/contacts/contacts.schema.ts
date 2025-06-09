import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ContactUs {
  @Prop({ type: String, required: true })
  video!: string;
}

export type ContactUsDocument = ContactUs & Document;
export const ContactUsSchema = SchemaFactory.createForClass(ContactUs);
