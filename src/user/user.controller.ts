import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthRequest } from 'src/common/auth-req';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/details')
  getUserById(@Req() req: AuthRequest) {
    const id = req.user._id;
    return this.userService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/edit')
  async editUser(
    @Req() req: AuthRequest,
    @Body() updates: { firstName?: string; email?: string },
  ) {
    const id = req.user._id;
    return this.userService.updateUser(id, updates);
  }
}
