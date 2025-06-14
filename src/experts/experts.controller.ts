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
import { memoryStorage } from 'multer';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { ExpertService } from './experts.service';
import { uploadToCloudinary } from 'src/utils/cloudinary';

@Controller('experts')
export class ExpertsController {
  constructor(private readonly expertService: ExpertService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async uploadExpert(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
  ): Promise<any> {
    const tempPath = path.join(os.tmpdir(), `expert-${Date.now()}.jpg`);
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

    return this.expertService.createExpert({ title, imageUrl });
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async updateExpert(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
  ): Promise<any> {
    let imageUrl: string | undefined;

    if (file) {
      const tempPath = path.join(os.tmpdir(), `expert-${Date.now()}.jpg`);
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

    return this.expertService.updateExpert(id, { title, imageUrl });
  }

  @Get()
  async getAllExperts(): Promise<any> {
    return this.expertService.getAllExperts();
  }

  @Delete(':id')
  async deleteExpert(@Param('id') id: string): Promise<any> {
    return this.expertService.deleteExpert(id);
  }
}
