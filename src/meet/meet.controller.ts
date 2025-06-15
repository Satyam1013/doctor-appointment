import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { MeetService } from './meet.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequest } from 'src/common/auth-req';

@Controller('meet')
@UseGuards(AuthGuard('jwt'))
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

  @Get('user')
  getUserMeets(@Req() req: AuthRequest) {
    const id = req.user._id;
    return this.meetService.getMeetsForUser(id);
  }

  @Get('doctor')
  getDoctorMeets(@Req() req: AuthRequest) {
    const id = req.user._id;
    return this.meetService.getMeetsForDoctor(id);
  }
}
