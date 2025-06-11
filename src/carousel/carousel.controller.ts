/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
import { CarouselService } from './carousel.service';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { uploadToCloudinary } from '../utils/cloudinary';

@Controller('carousels')
export class CarouselController {
  constructor(private readonly carouselService: CarouselService) {}

  @Get()
  async getCarousels() {
    return this.carouselService.getCarousels();
  }

  @Post('/multiple')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: memoryStorage(),
    }),
  )
  async uploadMultipleImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('type')
    type:
      | 'top'
      | 'bottom'
      | 'mydent'
      | 'shop-top'
      | 'shop-middle'
      | 'shop-bottom',
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

    return this.carouselService.addMultipleCarouselImages(type, uploadResults);
  }

  @Delete(':id')
  async deleteCarousel(@Param('id') id: string) {
    return this.carouselService.deleteCarousel(id);
  }
}
