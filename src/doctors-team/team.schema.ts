import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DoctorsTeamDocument = HydratedDocument<DoctorsTeam>;

@Schema({ timestamps: true })
export class DoctorsTeam {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  image!: string;
}

export const DoctorsTeamSchema = SchemaFactory.createForClass(DoctorsTeam);
