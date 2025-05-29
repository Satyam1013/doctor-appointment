import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthRequest } from 'src/common/auth-req';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/details')
  getUserById(@Req() req: AuthRequest) {
    const id = req.user._id;
    return this.userService.findById(id);
  }

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Patch('/edit')
  async editUser(
    @Req() req: AuthRequest,
    @Body()
    updates: {
      firstName?: string;
      email?: string;
      mobile?: string;
    },
  ) {
    const id = req.user._id;
    return this.userService.updateUser(id, updates);
  }
}
