import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarouselDocument = Carousel & Document;

@Schema({ timestamps: true })
export class Carousel {
  @Prop({ required: true, enum: ['top', 'bottom'] })
  type!: 'top' | 'bottom';

  @Prop({ required: true })
  imageUrl!: string;
}

export const CarouselSchema = SchemaFactory.createForClass(Carousel);
