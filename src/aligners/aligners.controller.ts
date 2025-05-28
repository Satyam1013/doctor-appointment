/* eslint-disable @typescript-eslint/no-unsafe-return */
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
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { MydentAlignersService } from './aligners.service';
import { CreateAlignersDto, UpdateAlignersDto } from './aligners.dto';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary';

@Controller('admin/mydent-aligners')
export class MydentAlignersController {
  constructor(private readonly service: MydentAlignersService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photo', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      { storage: memoryStorage() },
    ),
  )
  async createAligner(
    @UploadedFiles()
    files: { photo?: Express.Multer.File[]; video?: Express.Multer.File[] },
    @Body() body: CreateAlignersDto,
  ) {
    const photoUrl = await this.uploadImage(files.photo?.[0]);
    const videoUrl = await this.uploadImage(files.video?.[0]);

    return this.service.create({
      ...body,
      photo: photoUrl,
      video: videoUrl,
    });
  }

  @Get()
  async getAllAligners() {
    return this.service.findAll();
  }

  @Get(':id')
  async getAlignerById(@Param('id') id: string) {
    const aligner = await this.service.findOne(id);
    if (!aligner) throw new NotFoundException('Aligner not found');
    return aligner;
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photo', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      { storage: memoryStorage() },
    ),
  )
  async updateAligner(
    @Param('id') id: string,
    @UploadedFiles()
    files: { photo?: Express.Multer.File[]; video?: Express.Multer.File[] },
    @Body() body: UpdateAlignersDto,
  ) {
    const aligner = await this.service.findOne(id);
    if (!aligner) throw new NotFoundException('Aligner not found');

    if (files.photo?.[0]) {
      await deleteFromCloudinary(aligner.photo);
      body.photo = await this.uploadImage(files.photo[0]);
    }

    if (files.video?.[0]) {
      await deleteFromCloudinary(aligner.video);
      body.video = await this.uploadImage(files.video[0]);
    }

    return this.service.update(id, body);
  }

  @Delete(':id')
  async deleteAligner(@Param('id') id: string) {
    const aligner = await this.service.findOne(id);
    if (!aligner) throw new NotFoundException('Aligner not found');

    await deleteFromCloudinary(aligner.photo);
    await deleteFromCloudinary(aligner.video);

    await this.service.delete(id);

    return { message: 'Aligner deleted successfully' };
  }

  private async uploadImage(file?: Express.Multer.File): Promise<string> {
    if (!file) return '';
    const tempPath = path.join(
      os.tmpdir(),
      `upload-${Date.now()}-${file.originalname}`,
    );
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
