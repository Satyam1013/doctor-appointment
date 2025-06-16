import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Transformation extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  imageUrl!: string;

  @Prop({ required: true })
  description!: string;
}

export const TransformationSchema =
  SchemaFactory.createForClass(Transformation);
