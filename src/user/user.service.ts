import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // 🆔 Find user by ID
  async findById(id: string) {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  // 🆕 Create a new user
  create(data: Partial<User>): Promise<User> {
    return this.userModel.create(data);
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // ✏️ Optional: Update user info
  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // ❌ Optional: Delete user
  async deleteUser(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('User not found');
  }
}
