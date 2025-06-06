import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: true })
class Clinic {
  @Prop()
  clinicName?: string;

  @Prop()
  clinicImage?: string;

  @Prop()
  address?: string;

  @Prop()
  timeFrom?: string;

  @Prop()
  timeTo?: string;

  @Prop()
  centerNumber?: string;

  @Prop()
  directions?: string;

  readonly _id!: Types.ObjectId;
}

export const ClinicSchema = SchemaFactory.createForClass(Clinic);

@Schema()
export class Centers extends Document {
  @Prop({ required: true })
  cityName!: string;

  @Prop({ required: true })
  imageUrl!: string;

  @Prop({ type: [ClinicSchema], default: [] })
  clinic?: Clinic[];
}

export const CentersSchema = SchemaFactory.createForClass(Centers);
