/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { Doctor, DoctorDocument } from 'src/doctor/doc.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
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

    user.assignedDoctor = {
      doctorId: new Types.ObjectId(doctorId),
      step,
      assignedAt: new Date(),
    };

    try {
      await user.save();
      return { message: 'Doctor assigned successfully', user };
    } catch (err) {
      throw new InternalServerErrorException('Failed to assign doctor');
    }
  }

  async updateUser(id: string, updateData: Partial<User>) {
    const updated = await this.userModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updated) {
      throw new NotFoundException('User not found');
    }
    return updated;
  }

  async deleteUser(id: string) {
    const deleted = await this.userModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }

  async updateDoctor(id: string, updateData: Partial<Doctor>) {
    const updated = await this.doctorModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updated) {
      throw new NotFoundException('Doctor not found');
    }
    return updated;
  }

  async deleteDoctor(id: string) {
    const deleted = await this.doctorModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException('Doctor not found');
    }
    return { message: 'Doctor deleted successfully' };
  }
}
