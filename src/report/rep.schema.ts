// rep.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/user.schema';

@Schema({ timestamps: true })
export class Report {
  @Prop({ required: true })
  imageUrl!: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user!: User;
}

export type ReportDocument = Report & Document;
export const ReportSchema = SchemaFactory.createForClass(Report);
