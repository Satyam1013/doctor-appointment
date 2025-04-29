/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 🧑 Get current user (from JWT)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req) {
    return this.userService.findByEmail(req.user.email);
  }

  // 📦 Admin endpoint to get all users
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  // 🔍 Get user by ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
