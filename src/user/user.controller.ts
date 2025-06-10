/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthRequest } from 'src/common/auth-req';
import { AuthGuard } from '@nestjs/passport';
import { DoctorAssignmentDto, UpdateUserDto } from './user.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/details')
  getUserById(@Req() req: AuthRequest) {
    const id = req.user._id;
    return this.userService.findById(id);
  }

  @Patch('/edit')
  async editUser(@Req() req: AuthRequest, @Body() updates: UpdateUserDto) {
    const id = req.user._id;
    return this.userService.updateUser(id, updates);
  }

  @Get('/doctor-assignment')
  async getDoctorAssignment(
    @Req() req: AuthRequest,
  ): Promise<DoctorAssignmentDto> {
    const id = req.user._id;
    return this.userService.getDoctorAssignment(id);
  }
}
