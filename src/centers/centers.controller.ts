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

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'centerImage', maxCount: 1 },
        { name: 'clinicImage', maxCount: 1 },
      ],
      { storage: memoryStorage() },
    ),
  )
  async uploadCenterData(
    @UploadedFiles()
    files: {
      centerImage?: Express.Multer.File[];
      clinicImage?: Express.Multer.File[];
    },
    @Body('cityName') cityName: string,
    @Body('clinicName') clinicName?: string,
    @Body('address') address?: string,
    @Body('timeFrom') timeFrom?: string,
    @Body('timeTo') timeTo?: string,
    @Body('centerNumber') centerNumber?: string,
    @Body('directions') directions?: string,
  ): Promise<any> {
    const uploadImage = async (file?: Express.Multer.File) => {
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
    };

    const centerImageUrl = await uploadImage(files.centerImage?.[0]);
    const clinicImageUrl = await uploadImage(files.clinicImage?.[0]);

    const clinicFieldsProvided =
      clinicName ||
      address ||
      timeFrom ||
      timeTo ||
      centerNumber ||
      clinicImageUrl;

    const centerData: any = {
      cityName,
      imageUrl: centerImageUrl,
    };

    if (clinicFieldsProvided) {
      centerData.clinic = [
        {
          clinicName,
          clinicImage: clinicImageUrl,
          address,
          timeFrom,
          timeTo,
          centerNumber,
          directions,
        },
      ];
    }

    return this.centersService.addCenter(centerData);
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
}
