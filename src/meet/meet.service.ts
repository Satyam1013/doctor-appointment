import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meet } from './meet.schema';

@Injectable()
export class MeetService {
  constructor(@InjectModel(Meet.name) private meetModel: Model<Meet>) {}

  async createMeet(data: {
    userId: string;
    doctorId: string;
    meetLink: string;
    date: string;
    time: string;
  }) {
    return this.meetModel.create(data);
  }

  async getMeetsForUser(userId: string) {
    return this.meetModel.find({ userId }).sort({ date: 1 });
  }

  async getMeetsForDoctor(doctorId: string) {
    return this.meetModel.find({ doctorId }).sort({ date: 1 });
  }
}
