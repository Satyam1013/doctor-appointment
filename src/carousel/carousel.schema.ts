import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarouselDocument = Carousel & Document;

@Schema({ timestamps: true })
export class Carousel {
  @Prop({
    required: true,
    enum: ['top', 'bottom', 'mydent', 'shop-top', 'shop-middle', 'shop-bottom'],
  })
  type!:
    | 'top'
    | 'bottom'
    | 'mydent'
    | 'shop-top'
    | 'shop-middle'
    | 'shop-bottom';

  @Prop({ required: true })
  imageUrl!: string;
}

export const CarouselSchema = SchemaFactory.createForClass(Carousel);
