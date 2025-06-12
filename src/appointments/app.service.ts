import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from './app.schema'; // ✅ use DoctorDocument

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
  ) {} // ✅ use DoctorDocument

  async findByEmail(email: string): Promise<DoctorDocument | null> {
    return this.doctorModel.findOne({ email }).exec(); // ✅ ensure Promise resolves
  }

  async create(data: Partial<Doctor>): Promise<DoctorDocument> {
    const doc = new this.doctorModel(data);
    return doc.save(); // ✅ returns a hydrated document
  }

  async getAppointmentsForDoctor(doctorId: string) {
    return this.appointmentModel.find({ doctorId });
  }
}
