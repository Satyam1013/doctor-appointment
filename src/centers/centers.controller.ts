/* eslint-disable @typescript-eslint/no-unsafe-return */
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
  Patch,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CentersService } from './centers.service';
import { memoryStorage } from 'multer';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { uploadToCloudinary } from '../utils/cloudinary';
import { AddCenterDto, AddClinicDto, AddServiceDto } from './centers.dto';

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
    @UploadedFiles() files: { centerImage?: Express.Multer.File[] },
    @Body() addCenterDto: AddCenterDto,
  ) {
    if (!addCenterDto.cityName) throw new Error('cityName is required');

    const centerImageUrl = await this.uploadImage(files.centerImage?.[0]);

    return this.centersService.addCenter({
      cityName: addCenterDto.cityName,
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
    @UploadedFiles() files: { clinicImage?: Express.Multer.File[] },
    @Body() body: AddClinicDto,
  ) {
    if (!cityName) throw new Error('City name param is required');

    const clinicImageUrl = await this.uploadImage(files.clinicImage?.[0]);

    const clinicData = {
      ...body,
      clinicImage: clinicImageUrl,
    };

    return this.centersService.addClinicToCenter(cityName, clinicData);
  }

  // 3. Edit a CLINIC by centerId and clinicId
  @Patch(':centerId/clinics/:clinicId')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'clinicImage', maxCount: 1 }], {
      storage: memoryStorage(),
    }),
  )
  async editClinic(
    @Param('centerId') centerId: string,
    @Param('clinicId') clinicId: string,
    @UploadedFiles() files: { clinicImage?: Express.Multer.File[] },
    @Body()
    body: {
      clinicName?: string;
      address?: string;
      timeFrom?: string;
      timeTo?: string;
      centerNumber?: string;
      directions?: string;
    },
  ): Promise<any> {
    const clinicImageUrl = await this.uploadImage(files.clinicImage?.[0]);

    const updateData = {
      ...body,
      ...(clinicImageUrl && { clinicImage: clinicImageUrl }),
    };

    return this.centersService.editClinic(centerId, clinicId, updateData);
  }

  // 4. Delete a CLINIC by centerId and clinicId
  @Delete(':centerId/clinics/:clinicId')
  async deleteClinic(
    @Param('centerId') centerId: string,
    @Param('clinicId') clinicId: string,
  ): Promise<any> {
    const deleted = await this.centersService.deleteClinic(centerId, clinicId);
    if (!deleted) throw new NotFoundException('Clinic not found');
    return { message: 'Clinic deleted successfully' };
  }

  // 5. Get all centers
  @Get()
  async getCenters(): Promise<any> {
    return this.centersService.getCenters();
  }

  // 6. Delete a center
  @Delete(':id')
  async deleteCenter(@Param('id') id: string): Promise<any> {
    const deleted = await this.centersService.deleteCenter(id);
    if (!deleted) throw new NotFoundException('Center not found');
    return { message: 'Center deleted successfully' };
  }

  // Controller
  @Post(':cityName/services')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 1 }], {
      storage: memoryStorage(),
    }),
  )
  async addService(
    @Param('cityName') cityName: string,
    @UploadedFiles() files: { image?: Express.Multer.File[] },
    @Body() addServiceDto: AddServiceDto,
  ) {
    const { title, description } = addServiceDto;

    if (!cityName || !title || !description) {
      throw new Error('cityName, title, and description are required');
    }

    const image = files.image?.[0];
    if (!image) {
      throw new Error('Service image is required');
    }

    const imageUrl = await this.uploadImage(image);

    return this.centersService.addServiceByCity({
      cityName,
      service: {
        title,
        description,
        image: imageUrl,
      },
    });
  }

  // 8. Get all services of a center
  @Get(':centerId/services')
  async getServices(@Param('centerId') centerId: string) {
    return this.centersService.getServices(centerId);
  }

  // 9. Update a service
  @Patch(':centerId/services/:serviceId')
  async updateService(
    @Param('centerId') centerId: string,
    @Param('serviceId') serviceId: string,
    @Body()
    body: {
      title?: string;
      description?: string;
      image?: string;
    },
  ) {
    const numericId = parseInt(serviceId, 10);
    if (isNaN(numericId)) throw new Error('Invalid service ID');
    return this.centersService.updateService(centerId, numericId, body);
  }

  // 10. Delete a service
  @Delete(':centerId/services/:serviceId')
  async deleteService(
    @Param('centerId') centerId: string,
    @Param('serviceId') serviceId: string,
  ) {
    const numericId = parseInt(serviceId, 10);
    if (isNaN(numericId)) throw new Error('Invalid service ID');
    const deleted = await this.centersService.deleteService(
      centerId,
      numericId,
    );
    if (!deleted) throw new NotFoundException('Service not found');
    return { message: 'Service deleted successfully' };
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
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
  }
}
