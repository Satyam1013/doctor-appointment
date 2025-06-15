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

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async uploadReportImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthRequest,
  ) {
    console.log('Uploading file for user:', req.user._id);
    console.log('Received file:', file?.originalname);

    if (!file) throw new Error('No file uploaded');

    const tempPath = path.join(os.tmpdir(), `report-${Date.now()}.jpg`);
    let imageUrl = '';

    try {
      fs.writeFileSync(tempPath, file.buffer);
      const result = await uploadBufferToCloudinary(
        file.buffer,
        file.originalname,
      );
      imageUrl = result.secure_url;
      console.log('Upload successful:', imageUrl);
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

  @Get('user-report')
  getMyReports(@Req() req: AuthRequest) {
    return this.service.findReportsByUser(req.user._id);
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
