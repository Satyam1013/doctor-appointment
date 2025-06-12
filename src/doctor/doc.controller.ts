/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Req } from '@nestjs/common';
import { DoctorService } from './doc.service';
import { AuthRequest } from 'src/common/auth-req';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  // Get assigned users for logged-in doctor
  @Get('assigned-users')
  async getAssignedUsers(@Req() req: AuthRequest) {
    const doctorId = req.user._id;
    return this.doctorService.getAssignedUsers(doctorId);
  }

  // Get conducted appointments
  @Get('appointments/conducted')
  async getConductedAppointments(@Req() req: AuthRequest) {
    const doctorId = req.user._id;
    return this.doctorService.getConductedAppointments(doctorId);
  }

  // Get upcoming appointments
  @Get('appointments/upcoming')
  async getUpcomingAppointments(@Req() req: AuthRequest) {
    const doctorId = req.user._id;
    return this.doctorService.getUpcomingAppointments(doctorId);
  }

  // Get revenue generated
  @Get('revenue')
  async getRevenue(@Req() req: AuthRequest) {
    const doctorId = req.user._id;
    return this.doctorService.getRevenueGenerated(doctorId);
  }

  // Get progress stats: scanned, payment done, pending payment
  @Get('progress')
  async getProgressStats(@Req() req: AuthRequest) {
    const doctorId = req.user._id;
    return this.doctorService.getProgressStats(doctorId);
  }

  // Get doctor reviews
  @Get('reviews')
  async getReviews(@Req() req: AuthRequest) {
    const doctorId = req.user._id;
    return this.doctorService.getDoctorReviews(doctorId);
  }

  // Get monthly statistics
  @Get('stats/monthly')
  async getMonthlyStats(@Req() req: AuthRequest) {
    const doctorId = req.user._id;
    return this.doctorService.getMonthlyStatistics(doctorId);
  }
}
