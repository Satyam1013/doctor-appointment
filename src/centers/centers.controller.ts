/* eslint-disable @typescript-eslint/no-unsafe-call */
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
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import * as path from 'path';

@Controller('admin/centers')
export class CentersController {
  constructor(private readonly centersService: CentersService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/centers',
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const filename = `${uuid()}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadCityImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
  ) {
    const imageUrl = `/uploads/centers/${file.filename}`;
    return this.centersService.addCenter({ name, imageUrl });
  }

  @Get()
  async getCenters() {
    return this.centersService.getCenters();
  }
}
