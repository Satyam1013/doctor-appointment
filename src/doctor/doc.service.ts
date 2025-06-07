import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor } from './doc.schema';

@Injectable()
export class DoctorService {
  constructor(@InjectModel(Doctor.name) private doctorModel: Model<Doctor>) {}

  async findByEmail(email: string): Promise<Doctor | null> {
    return this.doctorModel.findOne({ email });
  }

  async create(data: Partial<Doctor>): Promise<Doctor> {
    return this.doctorModel.create(data);
  }
}
