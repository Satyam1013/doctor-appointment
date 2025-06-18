import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket, TicketDocument, TicketStatus } from './ticket.schema';
import { Model } from 'mongoose';
import { CreateTicketDto } from './ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
  ) {}

  async createTicket(
    dto: CreateTicketDto & { userId: string; fileUrl?: string },
  ): Promise<Ticket> {
    const created = new this.ticketModel(dto);
    return created.save();
  }

  async getTicketsByUser(userId: string): Promise<Ticket[]> {
    return this.ticketModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async getAllTickets(): Promise<Ticket[]> {
    return this.ticketModel.find().sort({ createdAt: -1 }).exec();
  }

  async updateStatus(
    ticketId: string,
    status: TicketStatus,
  ): Promise<Ticket | null> {
    return this.ticketModel.findByIdAndUpdate(
      ticketId,
      { status },
      { new: true },
    );
  }
}
