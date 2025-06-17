// controllers/team.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { DoctorsTeamService } from './team.service';
import { CreateDoctorsTeamDto, UpdateDoctorsTeamDto } from './team.dto';

@Controller('team')
export class DoctorsTeamController {
  constructor(private readonly doctorsTeamService: DoctorsTeamService) {}

  @Post()
  create(@Body() dto: CreateDoctorsTeamDto) {
    return this.doctorsTeamService.create(dto);
  }

  @Get()
  findAll() {
    return this.doctorsTeamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsTeamService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDoctorsTeamDto) {
    return this.doctorsTeamService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsTeamService.remove(id);
  }

  // ✅ Assign doctors team to user
  @Post('assign/:userId')
  assignToUser(
    @Param('userId') userId: string,
    @Body() dto: { teamIds: string[] }, // Expecting 5 team IDs
  ) {
    return this.doctorsTeamService.assignToUser(userId, dto.teamIds);
  }
}
