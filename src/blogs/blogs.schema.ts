// blog.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Blog extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  date!: string;

  @Prop({ required: true })
  author!: string;

  @Prop({ required: true })
  category!: string;

  @Prop({ type: [String], default: [] })
  images!: string[];

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  content!: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
