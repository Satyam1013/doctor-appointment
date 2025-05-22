/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Body,
  Get,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AdminService } from './admin.service';
import { uploadToCloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path';

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
        // Save buffer to a temporary file
        const tempPath = path.join(__dirname, `../../temp-${Date.now()}.jpg`);
        fs.writeFileSync(tempPath, file.buffer);

        // Upload to Cloudinary
        const result = await uploadToCloudinary(tempPath);

        // Delete temp file
        fs.unlinkSync(tempPath);

        return result.secure_url;
      }),
    );

    return this.adminService.addMultipleCarouselImages(type, uploadResults);
  }
}
