import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export type TicketDocument = Ticket & Document;

@Schema({ timestamps: true })
export class Ticket {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  message!: string;

  @Prop({ required: true, default: 'General' })
  category!: string;

  @Prop()
  fileUrl?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'User' })
  userId!: string;

  @Prop({ required: true, enum: TicketStatus, default: TicketStatus.OPEN })
  status!: TicketStatus;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
