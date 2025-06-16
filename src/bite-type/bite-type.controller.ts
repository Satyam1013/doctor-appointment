import {
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
  UploadedFiles,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { uploadBufferToCloudinary } from '../utils/cloudinary';
import { BiteTypeService } from './bite-type.service';
import { BiteTypeDto, UpdateBiteTypeDto } from './bite-type.dto';

@Controller('bite')
export class BiteTypeController {
  constructor(private readonly service: BiteTypeService) {}

  // Upload testimonial with video
  @Post()
  @UseInterceptors(
    FilesInterceptor('videos', 5, {
      storage: memoryStorage(),
    }),
  )
  async uploadMultipleVideos(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: BiteTypeDto,
  ) {
    const uploadedVideos = await Promise.all(
      files.map((file) =>
        uploadBufferToCloudinary(file.buffer, file.originalname),
      ),
    );

    const videoUrls = uploadedVideos.map((v) => v.secure_url);

    return this.service.create({
      ...body,
      videos: videoUrls, // you'll need to adjust your DTO & schema
    });
  }

  @Get()
  async getAllTestimonials() {
    return this.service.findAll();
  }

  @Patch(':id')
  async updateBiteType(
    @Param('id') id: string,
    @Body() updateDto: UpdateBiteTypeDto,
  ) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  async deleteBiteType(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
