/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uploadToCloudinary } from 'src/utils/cloudinary';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { Expert, ExpertDocument } from './experts.schema';

@Injectable()
export class ExpertService {
  constructor(
    @InjectModel(Expert.name) private doctorModel: Model<ExpertDocument>,
  ) {}

  async updateExpertProfile(
    doctorId: string,
    file: Express.Multer.File,
    title: string,
  ): Promise<ExpertDocument> {
    const tempPath = path.join(os.tmpdir(), `expert-${Date.now()}.jpg`);
    fs.writeFileSync(tempPath, file.buffer);

    const result = await uploadToCloudinary(tempPath);
    fs.unlinkSync(tempPath);

    const updated = await this.doctorModel.findByIdAndUpdate(
      doctorId,
      { image: result.secure_url, title },
      { new: true },
    );

    if (!updated) {
      throw new Error('Expert not found');
    }

    return updated;
  }

  async editExpertProfile(
    doctorId: string,
    file: Express.Multer.File | undefined,
    title: string,
  ): Promise<ExpertDocument> {
    let imageUrl: string | undefined;

    if (file) {
      const tempPath = path.join(os.tmpdir(), `expert-${Date.now()}.jpg`);
      fs.writeFileSync(tempPath, file.buffer);
      const result = await uploadToCloudinary(tempPath);
      fs.unlinkSync(tempPath);
      imageUrl = result.secure_url;
    }

    const updateFields: any = { title };
    if (imageUrl) {
      updateFields.image = imageUrl;
    }

    const updated = await this.doctorModel.findByIdAndUpdate(
      doctorId,
      updateFields,
      { new: true },
    );

    if (!updated) {
      throw new Error('Expert not found');
    }

    return updated;
  }

  async deleteExpertImage(doctorId: string): Promise<ExpertDocument> {
    const updated = await this.doctorModel.findByIdAndUpdate(
      doctorId,
      { image: null },
      { new: true },
    );

    if (!updated) {
      throw new Error('Expert not found');
    }

    return updated;
  }

  async getExpertProfile(doctorId: string): Promise<ExpertDocument> {
    const expert = await this.doctorModel.findById(doctorId);
    if (!expert) {
      throw new Error('Expert not found');
    }
    return expert;
  }
}
