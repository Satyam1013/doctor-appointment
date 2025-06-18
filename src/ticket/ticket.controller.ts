import {
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
  UploadedFile,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './ticket.service';
import { CreateTicketDto } from './ticket.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { AuthRequest } from 'src/common/auth-req';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/reports',
        filename: (req, file, cb) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async createTicket(
    @Body() body: CreateTicketDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthRequest,
  ) {
    const userId = req.user._id;

    const fileUrl = file ? `/uploads/reports/${file.filename}` : undefined;

    return this.ticketsService.createTicket({ ...body, userId, fileUrl });
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getUserTickets(@Req() req: AuthRequest) {
    const userId = req.user._id;
    return this.ticketsService.getTicketsByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTickets() {
    return this.ticketsService.getAllTickets();
  }
}
