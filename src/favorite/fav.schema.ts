// src/cart/cart.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from '../product/product.schema';

@Schema({ timestamps: true })
export class FavItem extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product!: Types.ObjectId | Product;

  @Prop({ required: true })
  userId!: string;
}

export const FavItemSchema = SchemaFactory.createForClass(FavItem);
