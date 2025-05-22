/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Body,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AdminService } from './admin.service';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { uploadToCloudinary } from '../utils/cloudinary';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('carousels')
  async getCarousels() {
    return this.adminService.getCarousels();
  }

  @Post('carousels/multiple')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: memoryStorage(),
    }),
  )
  async uploadMultipleImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('type') type: 'top' | 'bottom',
  ) {
    const uploadResults = await Promise.all(
      files.map(async (file) => {
        const tempPath = path.join(os.tmpdir(), `upload-${Date.now()}.jpg`);
        fs.writeFileSync(tempPath, file.buffer);

        const result = await uploadToCloudinary(tempPath);

        fs.unlinkSync(tempPath);
        return result.secure_url;
      }),
    );

    return this.adminService.addMultipleCarouselImages(type, uploadResults);
  }

  @Delete('carousels/:id')
  async deleteCarousel(@Param('id') id: string) {
    return this.adminService.deleteCarousel(id);
  }
}
