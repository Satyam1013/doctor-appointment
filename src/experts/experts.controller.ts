import {
  Controller,
  Req,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Delete,
  Get,
  Put,
} from '@nestjs/common';
import { ExpertService } from './experts.service';
import { AuthRequest } from 'src/common/auth-req';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('expert')
export class ExpertController {
  constructor(private readonly expertService: ExpertService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
    @Req() req: AuthRequest,
  ) {
    const doctorId = req.user._id;
    return this.expertService.updateExpertProfile(doctorId, file, title);
  }

  @Put()
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async updateProfile(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
    @Req() req: AuthRequest,
  ) {
    const doctorId = req.user._id;
    return this.expertService.editExpertProfile(doctorId, file, title);
  }

  @Get()
  async getProfile(@Req() req: AuthRequest) {
    const doctorId = req.user._id;
    return this.expertService.getExpertProfile(doctorId);
  }

  @Delete()
  async deleteProfileImage(@Req() req: AuthRequest) {
    const doctorId = req.user._id;
    return this.expertService.deleteExpertImage(doctorId);
  }
}
