import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { DoctorsTeamService } from './team.service';
import {
  AssignDoctorTeamsDto,
  CreateDoctorsTeamDto,
  UpdateDoctorsTeamDto,
} from './team.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadBufferToCloudinary } from 'src/utils/cloudinary';

@Controller('team')
export class DoctorsTeamController {
  constructor(private readonly doctorsTeamService: DoctorsTeamService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateDoctorsTeamDto,
  ) {
    if (file) {
      const result = await uploadBufferToCloudinary(
        file.buffer,
        file.originalname,
      );
      dto.image = result.secure_url;
    }
    return this.doctorsTeamService.create(dto);
  }

  @Get()
  findAll() {
    return this.doctorsTeamService.findAll();
  }

  @Get('user/:id')
  getByUser(@Param('id') userId: string) {
    return this.doctorsTeamService.getDoctorsTeamByUserId(userId);
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
    @Body() dto: AssignDoctorTeamsDto,
  ) {
    if (!dto.teams || dto.teams.length !== 5) {
      throw new BadRequestException('Exactly 5 doctor teams must be provided');
    }

    return this.doctorsTeamService.assignToUser(userId, dto.teams);
  }
}
