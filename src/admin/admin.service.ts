import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.schema'; // Update path as needed
import { Doctor } from 'src/doctor/doc.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Doctor') private readonly doctorModel: Model<Doctor>,
  ) {}

  async getAllUsers() {
    return this.userModel.find();
  }

  async getAllDoctors() {
    return this.doctorModel.find();
  }

  async assignDoctorToUser(userId: string, doctorId: string, step: number) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const doctor = await this.doctorModel.findById(doctorId);
    if (!doctor) throw new NotFoundException('Doctor not found');

    user.assignedDoctor = doctor._id;
    user.currentStep = step;
    await user.save();

    return {
      message: 'Doctor assigned successfully',
      user,
    };
  }
}
