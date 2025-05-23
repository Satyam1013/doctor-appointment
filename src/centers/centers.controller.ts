/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  Get,
  UploadedFiles,
  UseInterceptors,
  Body,
  Delete,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CentersService } from './centers.service';
import { memoryStorage } from 'multer';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { uploadToCloudinary } from '../utils/cloudinary';

@Controller('admin/centers')
export class CentersController {
  constructor(private readonly centersService: CentersService) {}

  // 1. Upload a new CENTER (city) with center image only
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'centerImage', maxCount: 1 }], {
      storage: memoryStorage(),
    }),
  )
  async addCenter(
    @UploadedFiles()
    files: { centerImage?: Express.Multer.File[] },
    @Body('cityName') cityName: string,
  ): Promise<any> {
    if (!cityName) {
      throw new Error('cityName is required');
    }

    const centerImageUrl = await this.uploadImage(files.centerImage?.[0]);

    return this.centersService.addCenter({
      cityName,
      imageUrl: centerImageUrl,
    });
  }

  // 2. Add a new CLINIC to existing center by cityName
  @Post(':cityName/clinics')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'clinicImage', maxCount: 1 }], {
      storage: memoryStorage(),
    }),
  )
  async addClinic(
    @Param('cityName') cityName: string,
    @UploadedFiles()
    files: { clinicImage?: Express.Multer.File[] },
    @Body()
    body: {
      clinicName: string;
      address: string;
      timeFrom: string;
      timeTo: string;
      centerNumber: string;
      directions?: string;
    },
  ): Promise<any> {
    if (!cityName) throw new Error('City name param is required');

    const clinicImageUrl = await this.uploadImage(files.clinicImage?.[0]);

    const clinicData = {
      ...body,
      clinicImage: clinicImageUrl,
    };

    return this.centersService.addClinicToCenter(cityName, clinicData);
  }

  @Get()
  async getCenters(): Promise<any> {
    return this.centersService.getCenters();
  }

  @Delete(':id')
  async deleteCenter(@Param('id') id: string): Promise<any> {
    const deleted = await this.centersService.deleteCenter(id);
    if (!deleted) {
      throw new NotFoundException('Center not found');
    }
    return { message: 'Center deleted successfully' };
  }

  private async uploadImage(file?: Express.Multer.File): Promise<string> {
    if (!file) return '';

    const tempPath = path.join(os.tmpdir(), `upload-${Date.now()}.jpg`);
    try {
      fs.writeFileSync(tempPath, file.buffer);
      const result = await uploadToCloudinary(tempPath);
      return result.secure_url;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error;
    } finally {
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    }
  }
}
