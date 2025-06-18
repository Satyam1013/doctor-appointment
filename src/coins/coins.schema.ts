import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type CoinsDocument = HydratedDocument<Coins>;

@Schema({ timestamps: true })
export class Coins {
  @Prop({ default: 0 }) coins?: number;
  @Prop() bonus?: number;
  @Prop() purchased?: number;
  @Prop() consultation?: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'User' })
  userId!: string;
}

export const CoinsSchema = SchemaFactory.createForClass(Coins);
