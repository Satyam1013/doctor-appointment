import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './admin.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // 🔍 Find user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  // 🆕 Create a new user
  async create(data: Partial<User>): Promise<User> {
    return this.userModel.create(data);
  }

  // 🔍 Find all users (for admin)
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // 🔍 Find user by ID
  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
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
