import {
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
  UploadedFiles,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ContactUsService } from './contacts.service';
import { uploadBufferToCloudinary } from '../utils/cloudinary';
import { CreateContactUsDto } from './contacts.dto';

@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly service: ContactUsService) {}

  // Upload testimonial with video
  @Post()
  @UseInterceptors(
    FilesInterceptor('videos', 5, {
      storage: memoryStorage(),
    }),
  )
  async uploadMultipleVideos(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateContactUsDto,
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

  @Delete('remove-video')
  async deleteVideo(@Query('url') videoUrl: string) {
    if (!videoUrl) {
      throw new BadRequestException('Video URL is required');
    }

    return this.service.removeVideo(videoUrl);
  }
}
