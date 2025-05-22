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
import { CentersService } from './centers.service';
import { memoryStorage } from 'multer';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { uploadToCloudinary } from '../utils/cloudinary';

@Controller('admin/centers')
export class CentersController {
  constructor(private readonly centersService: CentersService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
    }),
  )
  async uploadCenterImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
    @Body('address') address: string,
    @Body('timeFrom') timeFrom: string,
    @Body('timeTo') timeTo: string,
    @Body('centerNumber') centerNumber: string,
    @Body('directions') directions?: string,
  ): Promise<any> {
    const tempPath = path.join(os.tmpdir(), `center-${Date.now()}.jpg`);
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

    return this.centersService.addCenter({
      name,
      imageUrl,
      address,
      timeFrom,
      timeTo,
      centerNumber,
      directions,
    });
  }

  @Get()
  async getCenters(): Promise<any> {
    return this.centersService.getCenters();
  }
}
