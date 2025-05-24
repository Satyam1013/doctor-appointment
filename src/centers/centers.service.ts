/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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

  // Add new center (city)
  async addCenter(data: { cityName: string; imageUrl: string }) {
    return this.centersModel.create(data);
  }

  // Add clinic to existing center by cityName
  async addClinicToCenter(
    cityName: string,
    clinicData: {
      clinicName: string;
      clinicImage: string;
      address: string;
      timeFrom: string;
      timeTo: string;
      centerNumber: string;
      directions?: string;
    },
  ) {
    const updateResult = await this.centersModel.updateOne(
      { cityName },
      { $push: { clinic: clinicData } },
    );

    if (updateResult.matchedCount === 0) {
      throw new Error(`Center with cityName "${cityName}" not found`);
    }

    return updateResult;
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

  async editClinic(centerId: string, clinicId: string, updateData: any) {
    const center = await this.centersModel.findById(centerId);
    const clinic = center?.clinic?.find(
      (c) => c?._id && c._id.toString() === clinicId,
    );
    if (!clinic) throw new Error('Clinic not found');

    if (updateData.clinicImage && clinic.clinicImage) {
      await deleteFromCloudinary(clinic.clinicImage);
    }

    return this.centersModel.updateOne(
      { _id: centerId, 'clinic._id': clinicId },
      {
        $set: Object.entries(updateData).reduce(
          (acc: Record<string, any>, [key, value]) => {
            acc[`clinic.$.${key}`] = value;
            return acc;
          },
          {} as Record<string, any>,
        ),
      },
    );
  }

  async deleteClinic(centerId: string, clinicId: string) {
    return await this.centersModel.updateOne(
      { _id: centerId },
      { $pull: { clinic: { _id: clinicId } } },
    );
  }
}
