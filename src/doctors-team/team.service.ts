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

  async getDoctorsTeamByUserId(userId: string): Promise<
    {
      name: string;
      image: string;
      type: string;
      date: string;
      time: string;
    }[]
  > {
    const user = await this.userModel.findById(userId).lean();

    if (!user || !user.doctorsTeam) {
      throw new NotFoundException('User or assigned doctor teams not found');
    }

    const teamIds = user.doctorsTeam.map(
      (entry) => new Types.ObjectId(entry.team),
    );
    const teams = await this.doctorsTeamModel
      .find({
        _id: { $in: teamIds },
      })
      .lean();

    const teamMap = new Map(teams.map((team) => [team._id.toString(), team]));

    return user.doctorsTeam.map((entry) => {
      const team = teamMap.get(entry.team.toString());
      return {
        name: team?.name || 'Unknown',
        image: team?.image || '',
        type: team?.type || '',
        date: entry.date,
        time: entry.time,
      };
    });
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
  async assignToUser(
    userId: string,
    teams: { id: string; date: string; time: string }[],
  ): Promise<UserDocument> {
    if (!teams || teams.length !== 5) {
      throw new Error('Exactly 5 doctors team entries must be provided');
    }

    const teamIds = teams.map((t) => new Types.ObjectId(t.id));
    const foundTeams = await this.doctorsTeamModel.find({
      _id: { $in: teamIds },
    });

    if (foundTeams.length !== 5) {
      throw new NotFoundException('Some DoctorsTeam entries not found');
    }

    const formattedDoctorsTeam = teams.map((t) => ({
      team: new Types.ObjectId(t.id),
      date: t.date,
      time: t.time,
    }));

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { doctorsTeam: formattedDoctorsTeam },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }
}
