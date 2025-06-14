import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MeetService } from './meet.service';

@Controller('meet')
export class MeetController {
  constructor(private meetService: MeetService) {}

  @Post('create')
  create(
    @Body()
    body: {
      userId: string;
      doctorId: string;
      meetLink: string;
      date: string;
      time: string;
    },
  ) {
    return this.meetService.createMeet(body);
  }

  @Get('user/:id')
  getUserMeets(@Param('id') userId: string) {
    return this.meetService.getMeetsForUser(userId);
  }

  @Get('doctor/:id')
  getDoctorMeets(@Param('id') doctorId: string) {
    return this.meetService.getMeetsForDoctor(doctorId);
  }
}
