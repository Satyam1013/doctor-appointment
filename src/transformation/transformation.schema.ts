import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Blog extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  imageUrl!: string;

  @Prop({ required: true })
  description!: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
