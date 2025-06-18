import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CoinsDocument = HydratedDocument<Coins>;

@Schema({ timestamps: true })
export class Coins {
  @Prop({ default: 0 }) coins?: number;
  @Prop() bonus?: number;
  @Prop() purchased?: number;
  @Prop() consultation?: number;
}

export const CoinsSchema = SchemaFactory.createForClass(Coins);
