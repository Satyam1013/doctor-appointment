/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BlogsService } from './blogs.service';
import { memoryStorage } from 'multer';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { uploadToCloudinary } from '../utils/cloudinary';

@Controller('admin/blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async uploadBlogImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
    @Body('description') description: string,
  ): Promise<any> {
    const tempPath = path.join(os.tmpdir(), `blog-${Date.now()}.jpg`);
    let imageUrl = '';

    try {
      fs.writeFileSync(tempPath, file.buffer);
      const result = await uploadToCloudinary(tempPath);
      imageUrl = result.secure_url;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error;
    } finally {
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    }

    return this.blogsService.createBlog({ title, description, imageUrl });
  }

  @Get()
  async getAllBlogs(): Promise<any> {
    return this.blogsService.getAllBlogs();
  }
}
