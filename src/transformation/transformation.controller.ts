/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformationService } from './transformation.service';
import { memoryStorage } from 'multer';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { uploadToCloudinary } from '../utils/cloudinary';

@Controller('admin/blogs')
export class TransformationController {
  constructor(private readonly transformationService: TransformationService) {}

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

    return this.transformationService.createTransformation({
      title,
      description,
      imageUrl,
    });
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async updateBlog(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
    @Body('description') description: string,
  ): Promise<any> {
    let imageUrl: string | undefined;

    if (file) {
      const tempPath = path.join(os.tmpdir(), `blog-${Date.now()}.jpg`);
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
    }

    return this.transformationService.updateTransformation(id, {
      title,
      description,
      imageUrl,
    });
  }

  @Get()
  async getAllTransformations(): Promise<any> {
    return this.transformationService.getAllTransformations();
  }

  @Delete(':id')
  async deleteTransformation(@Param('id') id: string): Promise<any> {
    return this.transformationService.deleteTransformation(id);
  }
}
