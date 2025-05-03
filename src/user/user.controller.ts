import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthRequest } from 'src/common/auth-req';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 🧑 Get current user (from JWT)
  @UseGuards(JwtAuthGuard)
  @Get('/details')
  getUserById(@Req() req: AuthRequest) {
    const id = req.user._id;
    return this.userService.findById(id);
  }

  // 📦 Admin endpoint to get all users
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }
}
