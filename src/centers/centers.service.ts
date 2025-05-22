import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Centers } from './centers.schema';
import { Model } from 'mongoose';

@Injectable()
export class CentersService {
  constructor(
    @InjectModel(Centers.name) private centersModel: Model<Centers>,
  ) {}

  async addCenter(data: {
    name: string;
    imageUrl: string;
    address: string;
    timeFrom: string;
    timeTo: string;
    centerNumber: string;
    directions?: string;
  }) {
    return this.centersModel.create(data);
  }

  async getCenters() {
    return this.centersModel.find().lean();
  }
}
