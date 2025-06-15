import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { uploadBufferToCloudinary } from '../utils/cloudinary';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { ReportService } from './rep.service';
import { AuthRequest } from 'src/common/auth-req';
import { AuthGuard } from '@nestjs/passport';

@Controller('report')
@UseGuards(AuthGuard('jwt'))
export class ReportController {
  constructor(private readonly service: ReportService) {}

  // Upload testimonial with video
  @Post()
  @UseInterceptors(
    FileInterceptor('video', {
      storage: memoryStorage(),
    }),
  )
  @Post('report')
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async uploadReportImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthRequest,
  ) {
    const tempPath = path.join(os.tmpdir(), `report-${Date.now()}.jpg`);
    let imageUrl = '';

    try {
      fs.writeFileSync(tempPath, file.buffer);
      const result = await uploadBufferToCloudinary(
        file.buffer,
        file.originalname,
      );
      imageUrl = result.secure_url;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error;
    } finally {
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }

    return this.service.createReport({
      imageUrl,
      userId: req.user._id,
    });
  }

  // 🧾 Get all reports
  @Get('report')
  async getAllReports() {
    return this.service.getReports();
  }

  // ❌ Delete a report by ID
  @Delete('report/:id')
  async deleteReport(@Param('id') id: string) {
    return this.service.deleteReport(id);
  }

  // ✏️ Update report image
  @Put('report/:id')
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async updateReport(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const tempPath = path.join(os.tmpdir(), `report-${Date.now()}.jpg`);
    let imageUrl = '';

    try {
      fs.writeFileSync(tempPath, file.buffer);
      const result = await uploadBufferToCloudinary(
        file.buffer,
        file.originalname,
      );
      imageUrl = result.secure_url;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error;
    } finally {
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }

    return this.service.updateReport(id, imageUrl);
  }
}
