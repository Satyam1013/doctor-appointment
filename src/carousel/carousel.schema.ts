import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarouselDocument = Carousel & Document;

@Schema({ timestamps: true })
export class Carousel {
  @Prop({
    required: true,
    enum: [
      'top',
      'bottom',
      'mydent',
      'shop-top',
      'shop-middle',
      'shop-bottom',
      'bite-type',
    ],
  })
  type!:
    | 'top'
    | 'bottom'
    | 'mydent'
    | 'shop-top'
    | 'shop-middle'
    | 'shop-bottom'
    | 'bite-type';

  @Prop({ required: true })
  imageUrl!: string;

  @Prop({ required: true })
  screenName!: string;
}

export const CarouselSchema = SchemaFactory.createForClass(Carousel);
