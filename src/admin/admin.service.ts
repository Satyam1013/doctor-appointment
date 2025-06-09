/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { Doctor } from 'src/doctor/doc.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Doctor.name) private doctorModel: Model<Doctor>,
  ) {}

  async getAllUsers() {
    return this.userModel.find();
  }

  async getAllDoctors() {
    return this.doctorModel.find();
  }

  async assignDoctorToUser(userId: string, doctorId: string, step: number) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const doctor = await this.doctorModel.findById(doctorId);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    // Assign the doctor
    user.assignedDoctor = {
      doctorId: new Types.ObjectId(doctorId),
      step,
      assignedAt: new Date(),
    };

    try {
      await user.save(); // This will now validate properly if mobile is present
      return { message: 'Doctor assigned successfully', user };
    } catch (err) {
      // Optional: log error if needed
      throw new InternalServerErrorException('Failed to assign doctor');
    }
  }
}
