import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Centers } from './centers.schema';
import { Model } from 'mongoose';
import { deleteFromCloudinary } from 'src/utils/cloudinary';

@Injectable()
export class CentersService {
  constructor(
    @InjectModel(Centers.name) private centersModel: Model<Centers>,
  ) {}

  async addCenter(data: {
    cityName: string;
    imageUrl: string;
    clinic?: {
      clinicName?: string;
      clinicImage?: string;
      address?: string;
      timeFrom?: string;
      timeTo?: string;
      centerNumber?: string;
      directions?: string;
    }[];
  }) {
    return this.centersModel.create(data);
  }

  async getCenters() {
    return this.centersModel.find().lean();
  }

  async deleteCenter(id: string): Promise<boolean> {
    const center = await this.centersModel.findById(id).exec();
    if (!center) return false;

    if (center.imageUrl) {
      try {
        await deleteFromCloudinary(center.imageUrl);
      } catch (err) {
        console.error('Failed to delete center image:', err);
      }
    }

    if (center.clinic && Array.isArray(center.clinic)) {
      for (const c of center.clinic) {
        if (c.clinicImage) {
          try {
            await deleteFromCloudinary(c.clinicImage);
          } catch (err) {
            console.error('Failed to delete clinic image:', err);
          }
        }
      }
    }

    await this.centersModel.findByIdAndDelete(id).exec();
    return true;
  }
}
