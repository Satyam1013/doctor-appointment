// src/mydent-aligners/schemas/aligners.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AlignerDocument = Aligner & Document;

@Schema({ timestamps: true })
export class Aligner {
  @Prop({ required: true })
  photo!: string;

  @Prop({ required: true })
  video!: string;

  @Prop({ required: true })
  qualityText!: string;
}

export const AlignerSchema = SchemaFactory.createForClass(Aligner);
