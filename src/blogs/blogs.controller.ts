/* eslint-disable @typescript-eslint/no-unsafe-return */
// blog.controller.ts
import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UploadedFiles,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { BlogService } from './blogs.service';
import { CreateBlogDto, EditBlogDto } from './blogs.dto';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { uploadToCloudinary } from '../utils/cloudinary';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 10 }], {
      storage: memoryStorage(),
    }),
  )
  async createBlog(
    @UploadedFiles() files: { images?: Express.Multer.File[] },
    @Body() body: CreateBlogDto,
  ) {
    const imageUrls = await Promise.all(
      (files.images || []).map((img) => this.uploadImage(img)),
    );

    return this.blogService.createBlog({
      ...body,
      images: imageUrls,
    });
  }

  @Get()
  getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @Get(':id')
  getBlogById(@Param('id') id: string) {
    return this.blogService.getBlogById(id);
  }

  @Patch(':id')
  async editBlog(@Param('id') id: string, @Body() body: EditBlogDto) {
    const updated = await this.blogService.editBlog(id, body);
    if (!updated) throw new NotFoundException('Blog not found');
    return updated;
  }

  @Delete(':id')
  async deleteBlog(@Param('id') id: string) {
    const deleted = await this.blogService.deleteBlog(id);
    if (!deleted) throw new NotFoundException('Blog not found');
    return { message: 'Blog deleted successfully' };
  }

  private async uploadImage(file: Express.Multer.File): Promise<string> {
    const tempPath = path.join(os.tmpdir(), `upload-${Date.now()}.jpg`);
    fs.writeFileSync(tempPath, file.buffer);
    const result = await uploadToCloudinary(tempPath);
    fs.unlinkSync(tempPath);
    return result.secure_url;
  }
}
