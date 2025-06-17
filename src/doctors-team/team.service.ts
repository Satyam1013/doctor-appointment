import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DoctorsTeam, DoctorsTeamDocument } from './team.schema';
import { CreateDoctorsTeamDto, UpdateDoctorsTeamDto } from './team.dto';
import { User, UserDocument } from '../user/user.schema';

@Injectable()
export class DoctorsTeamService {
  constructor(
    @InjectModel(DoctorsTeam.name)
    private doctorsTeamModel: Model<DoctorsTeamDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateDoctorsTeamDto): Promise<DoctorsTeam> {
    return this.doctorsTeamModel.create(dto);
  }

  async findAll(): Promise<DoctorsTeam[]> {
    return this.doctorsTeamModel.find().exec();
  }

  async findOne(id: string): Promise<DoctorsTeam> {
    const doctor = await this.doctorsTeamModel.findById(id).exec();
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async update(id: string, dto: UpdateDoctorsTeamDto): Promise<DoctorsTeam> {
    const updated = await this.doctorsTeamModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Doctor not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.doctorsTeamModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Doctor not found');
  }

  // ✅ Assign 5 doctors team to user
  async assignToUser(userId: string, teamIds: string[]): Promise<UserDocument> {
    if (teamIds.length !== 5) {
      throw new Error('Exactly 5 doctors team IDs must be provided');
    }

    // Optional: Check if all teamIds exist
    const teams = await this.doctorsTeamModel.find({
      _id: { $in: teamIds.map((id) => new Types.ObjectId(id)) },
    });

    if (teams.length !== 5) {
      throw new NotFoundException('Some DoctorsTeam entries not found');
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { doctorsTeam: teamIds },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }
}
