// schemas/product.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;
@Schema()
export class Product extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  categoryKey!: string;

  @Prop({ required: true })
  price!: number;

  @Prop()
  originalPrice!: number;

  @Prop()
  description!: string;

  @Prop([String])
  tags!: string[];

  @Prop([Object])
  images!: any[];

  @Prop()
  productDetails?: string;

  @Prop()
  benefits?: string;

  @Prop()
  howToUse?: string;

  @Prop()
  ingredients?: string;

  @Prop()
  caution?: string;

  @Prop()
  information?: string;

  @Prop()
  contents?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
