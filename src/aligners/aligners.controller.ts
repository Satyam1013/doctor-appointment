/* eslint-disable @typescript-eslint/unbound-method */
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
        { name: 'image', maxCount: 10 },
        { name: 'video', maxCount: 10 },
      ],
      { storage: memoryStorage() },
    ),
  )
  async createAligner(
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; video?: Express.Multer.File[] },
    @Body() body: CreateAlignersDto,
  ) {
    const imageUrls = await Promise.all(
      (files.image || []).map(this.uploadFile),
    );
    const videoUrls = await Promise.all(
      (files.video || []).map(this.uploadFile),
    );

    return this.service.create({
      ...body,
      image: imageUrls,
      video: videoUrls,
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
        { name: 'image', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      { storage: memoryStorage() },
    ),
  )
  async updateAligner(
    @Param('id') id: string,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; video?: Express.Multer.File[] },
    @Body() body: UpdateAlignersDto,
  ) {
    const aligner = await this.service.findOne(id);
    if (!aligner) throw new NotFoundException('Aligner not found');

    if (files.image?.length) {
      for (const url of aligner.image) await deleteFromCloudinary(url);
      body.image = await Promise.all(files.image.map(this.uploadFile));
    }

    if (files.video?.length) {
      for (const url of aligner.video) await deleteFromCloudinary(url);
      body.video = await Promise.all(files.video.map(this.uploadFile));
    }

    return this.service.update(id, body);
  }

  @Delete(':id')
  async deleteAligner(@Param('id') id: string) {
    const aligner = await this.service.findOne(id);
    if (!aligner) throw new NotFoundException('Aligner not found');

    // Delete all images
    for (const url of aligner.image) {
      await deleteFromCloudinary(url);
    }

    // Delete all videos
    for (const url of aligner.video) {
      await deleteFromCloudinary(url);
    }

    await this.service.delete(id);

    return { message: 'Aligner deleted successfully' };
  }

  private async uploadFile(file?: Express.Multer.File): Promise<string> {
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
