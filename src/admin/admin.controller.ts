import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Body,
  Get,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('carousels')
  async getCarousels() {
    return this.adminService.getCarousels();
  }

  @Post('carousels/multiple')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      // 'images' should match React form field
      storage: diskStorage({
        destination: './uploads/carousel',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = extname(file.originalname);
          cb(null, `${uniqueSuffix}${fileExt}`);
        },
      }),
    }),
  )
  async uploadMultipleImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('type') type: 'top' | 'bottom',
  ) {
    const imageUrls = files.map(
      (file) =>
        `https://doctor-appointment-5j6e.onrender.com/uploads/carousel/${file.filename}`,
    );
    return this.adminService.addMultipleCarouselImages(type, imageUrls);
  }
}
