import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExpertDocument = HydratedDocument<Expert>;

export class Expert {
  @Prop() image!: string;

  @Prop() title!: string;
}

export const ExpertSchema = SchemaFactory.createForClass(Expert);
