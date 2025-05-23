import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class Clinic {
  @Prop({ required: true })
  clinicName!: string;

  @Prop({ required: true })
  clinicImage!: string;

  @Prop({ required: true })
  address!: string;

  @Prop({ required: true })
  timeFrom!: string;

  @Prop({ required: true })
  timeTo!: string;

  @Prop({ required: true })
  centerNumber!: string;

  @Prop()
  directions?: string;
}

export const ClinicSchema = SchemaFactory.createForClass(Clinic);

@Schema()
export class Centers extends Document {
  @Prop({ required: true })
  cityName!: string;

  @Prop({ required: true })
  imageUrl!: string;

  @Prop({ type: [ClinicSchema], required: true })
  clinic!: Clinic[];
}

export const CentersSchema = SchemaFactory.createForClass(Centers);
