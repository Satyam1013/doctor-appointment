import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report, ReportDocument } from 'src/report/rep.schema';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name)
    private reportModel: Model<ReportDocument>,
  ) {}

  async createReport(data: { imageUrl: string; userId: string }) {
    const report = new this.reportModel({
      imageUrl: data.imageUrl,
      user: data.userId,
    });
    return report.save();
  }

  async getReports() {
    return this.reportModel.find().sort({ createdAt: -1 });
  }

  async deleteReport(id: string) {
    return this.reportModel.findByIdAndDelete(id);
  }

  async updateReport(id: string, imageUrl: string) {
    return this.reportModel.findByIdAndUpdate(id, { imageUrl }, { new: true });
  }
}
