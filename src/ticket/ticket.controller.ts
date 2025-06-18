import {
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
  UploadedFile,
  Req,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { TicketsService } from './ticket.service';
import { CreateTicketDto, UpdateTicketStatusDto } from './ticket.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { AuthRequest } from 'src/common/auth-req';
import { AuthGuard } from '@nestjs/passport';

@Controller('tickets')
@UseGuards(AuthGuard('jwt'))
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

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

  @Get('my')
  async getUserTickets(@Req() req: AuthRequest) {
    const userId = req.user._id;
    return this.ticketsService.getTicketsByUser(userId);
  }

  @Get()
  async getAllTickets() {
    return this.ticketsService.getAllTickets();
  }

  @Patch(':id/status')
  async updateTicketStatus(
    @Param('id') id: string,
    @Body() body: UpdateTicketStatusDto,
  ) {
    return this.ticketsService.updateStatus(id, body.status);
  }
}
