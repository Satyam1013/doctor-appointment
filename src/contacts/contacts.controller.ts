import {
  Controller,
  Post,
  Get,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CreateContactUsDto } from './contacts.dto';
import { ContactUsService } from './contacts.service';
import { uploadBufferToCloudinary } from '../utils/cloudinary';

@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly service: ContactUsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('video', {
      storage: memoryStorage(),
    }),
  )
  async testimonialVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateContactUsDto,
  ) {
    let videoUrl: string | undefined;

    if (file) {
      const result = await uploadBufferToCloudinary(
        file.buffer,
        file.originalname,
      );
      videoUrl = result.secure_url;
    }

    return this.service.create({
      ...body,
      video: videoUrl ?? '',
    });
  }

  @Get()
  async getAllTestimonials() {
    return this.service.findAll();
  }
}
