import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AlignerDocument = Aligner & Document;

@Schema({ timestamps: true })
export class Aligner {
  @Prop({ type: [String], required: true })
  photo!: string[];

  @Prop({ type: [String], required: true })
  video!: string[];

  @Prop({ required: true })
  price!: string;
}

export const AlignerSchema = SchemaFactory.createForClass(Aligner);
