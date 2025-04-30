/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRole } from './user.schema';

export interface AuthRequest extends Request {
  user: {
    email: string;
    role: UserRole;
  };
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 🧑 Get current user (from JWT)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: AuthRequest) {
    return this.userService.findByEmail(req.user.email);
  }

  // 📦 Admin endpoint to get all users
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  // 🔍 Get user by ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
