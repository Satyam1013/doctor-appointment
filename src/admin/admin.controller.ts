import { Controller, Get, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('doctors')
  getAllDoctors() {
    return this.adminService.getAllDoctors();
  }

  @Post('assign-doctor')
  assignDoctorToUser(
    @Body() body: { userId: string; doctorId: string; step: number },
  ) {
    return this.adminService.assignDoctorToUser(
      body.userId,
      body.doctorId,
      body.step,
    );
  }
}
