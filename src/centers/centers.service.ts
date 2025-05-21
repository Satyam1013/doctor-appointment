import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Centers } from './centers.schema';
import { Model } from 'mongoose';

@Injectable()
export class CentersService {
  constructor(
    @InjectModel(Centers.name) private centersModel: Model<Centers>,
  ) {}

  async addCenters(data: { name: string; imageUrl: string }[]) {
    await this.centersModel.deleteMany(); // overwrite
    return this.centersModel.insertMany(data);
  }

  async getCenters() {
    return this.centersModel.find().lean();
  }
}
