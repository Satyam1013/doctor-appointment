import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Expert extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  imageUrl!: string;
}

export const ExpertSchema = SchemaFactory.createForClass(Expert);
