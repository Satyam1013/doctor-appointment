import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Centers extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  imageUrl!: string;
}

export const CentersSchema = SchemaFactory.createForClass(Centers);
