import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Centers extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  imageUrl!: string;

  @Prop({ required: true })
  address!: string;

  @Prop({ required: true })
  timeFrom!: string; // or Date if needed

  @Prop({ required: true })
  timeTo!: string; // or Date if needed

  @Prop({ required: true })
  centerNumber!: string; // use `number` if it's strictly numeric

  @Prop()
  directions?: string; // optional field
}

export const CentersSchema = SchemaFactory.createForClass(Centers);
