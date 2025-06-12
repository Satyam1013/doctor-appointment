/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from './doc.schema';
import { User, UserDocument } from '../user/user.schema';
import { Appointment, AppointmentDocument } from 'src/appointments/app.schema';
import { Review, ReviewDocument } from 'src/review/review.schema';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async findByEmail(email: string): Promise<DoctorDocument | null> {
    return this.doctorModel.findOne({ email }).exec();
  }

  async create(data: Partial<Doctor>): Promise<DoctorDocument> {
    const doc = new this.doctorModel(data);
    return doc.save();
  }

  // 1. Get all assigned users to this doctor
  async getAssignedUsers(doctorId: string): Promise<UserDocument[]> {
    const dd = this.userModel
      .find({ 'assignedDoctor.doctorId': doctorId })
      .exec();
    console.log('dd', dd);
    return this.userModel.find({ 'assignedDoctor.doctorId': doctorId }).exec();
  }

  // 2. Get all appointments conducted by this doctor
  async getConductedAppointments(doctorId: string) {
    return this.appointmentModel
      .find({
        doctor: doctorId,
        status: 'completed',
      })
      .exec();
  }

  // 3. Get upcoming appointments
  async getUpcomingAppointments(doctorId: string) {
    return this.appointmentModel
      .find({
        doctor: doctorId,
        status: 'scheduled',
        date: { $gte: new Date() },
      })
      .exec();
  }

  // 4. Revenue generated
  async getRevenueGenerated(doctorId: string) {
    const result = await this.appointmentModel.aggregate([
      { $match: { doctor: doctorId, status: 'completed' } },
      { $group: { _id: null, totalRevenue: { $sum: '$fee' } } },
    ]);

    return result[0]?.totalRevenue || 0;
  }

  // 5. Progress summary (scanned, payment done, pending)
  async getProgressStats(doctorId: string) {
    const scanned = await this.appointmentModel.countDocuments({
      doctor: doctorId,
      scanned: true,
    });
    const paymentDone = await this.appointmentModel.countDocuments({
      doctor: doctorId,
      paymentStatus: 'done',
    });
    const pending = await this.appointmentModel.countDocuments({
      doctor: doctorId,
      paymentStatus: 'pending',
    });

    return {
      scanned,
      paymentDone,
      pending,
    };
  }

  // 6. Get reviews
  async getDoctorReviews(doctorId: string): Promise<ReviewDocument[]> {
    return this.reviewModel.find({ doctor: doctorId }).exec();
  }

  // 7. Monthly statistics
  async getMonthlyStatistics(doctorId: string) {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const appointments = await this.appointmentModel.find({
      doctorId: doctorId,
      status: 'done',
      appointmentDate: { $gte: start, $lt: end },
    });

    const totalRevenue = appointments.reduce(
      (sum, a) => sum + (a.amount || 0),
      0,
    );
    const totalAppointments = appointments.length;

    return {
      totalAppointments,
      totalRevenue,
    };
  }
}
