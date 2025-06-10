import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { DoctorAssignmentDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // Find user by ID (excluding password)
  async findById(id: string) {
    try {
      const user = await this.userModel.findById(id).select('-password').exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // Update user
  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      console.error(`Failed to update user with ID ${id}:`, error);
      throw error;
    }
  }

  // Delete user
  async deleteUser(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('User not found');
  }

  async getDoctorAssignment(id: string): Promise<any> {
    try {
      const user = await this.userModel
        .findById(id)
        .select('assignedDoctor')
        .populate({
          path: 'assignedDoctor.doctorId',
          select: 'name specialty email specialization place',
          model: 'Doctor',
        })
        .exec();

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      if (!user.assignedDoctor) {
        throw new NotFoundException(
          `No doctor assigned for user with ID ${id}`,
        );
      }

      return {
        doctor: user.assignedDoctor.doctorId,
        step: user.assignedDoctor.step,
        assignedAt: user.assignedDoctor.assignedAt,
      };
    } catch (error) {
      console.error(
        `Failed to get doctor assignment for user with ID ${id}:`,
        error,
      );
      throw error;
    }
  }
}
