import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class BiteType {
  @Prop({ required: true })
  title!: string;

  @Prop({ type: [String], required: true })
  videos!: string[];
}
export type BiteTypeDocument = BiteType & Document;
export const BiteTypeSchema = SchemaFactory.createForClass(BiteType);
