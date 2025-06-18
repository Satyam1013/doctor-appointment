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
import * as multer from 'multer';
import { AuthRequest } from 'src/common/auth-req';
import { AuthGuard } from '@nestjs/passport';
import { uploadBufferToCloudinary } from 'src/utils/cloudinary'; // adjust path

@Controller('tickets')
@UseGuards(AuthGuard('jwt'))
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(),
    }),
  )
  async createTicket(
    @Body() body: CreateTicketDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthRequest,
  ) {
    const userId = req.user._id;

    let fileUrl: string | undefined;

    if (file) {
      const result = await uploadBufferToCloudinary(
        file.buffer,
        file.originalname,
      );
      fileUrl = result.secure_url;
    }

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
