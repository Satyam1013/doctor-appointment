/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
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

  // Update User
  @Patch('user/:id')
  updateUser(@Param('id') id: string, @Body() body: any) {
    return this.adminService.updateUser(id, body);
  }

  // Delete User
  @Delete('user/:id')
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }

  // Update Doctor
  @Patch('doctor/:id')
  updateDoctor(@Param('id') id: string, @Body() body: any) {
    return this.adminService.updateDoctor(id, body);
  }

  // Delete Doctor
  @Delete('doctor/:id')
  deleteDoctor(@Param('id') id: string) {
    return this.adminService.deleteDoctor(id);
  }
}
