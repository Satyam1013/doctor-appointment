import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { AdminLoginDto } from './dto/admin.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ----------------- Signup routes -----------------
  @Post('signup/user')
  signupUser(@Body() dto: SignupDto) {
    return this.authService.signupUser(dto);
  }

  @Post('signup/doctor')
  signupDoctor(@Body() dto: SignupDto) {
    return this.authService.signupDoctor(dto);
  }

  @Post('signup/admin')
  signupAdmin(@Body() dto: SignupDto) {
    return this.authService.signupAdmin(dto);
  }

  // ----------------- Login routes -----------------
  @Post('login/user')
  loginUser(@Body() dto: { email: string; password: string }) {
    return this.authService.loginUser(dto.email, dto.password);
  }

  @Post('login/doctor')
  loginDoctor(@Body() dto: { email: string; password: string }) {
    return this.authService.loginDoctor(dto.email, dto.password);
  }

  @Post('login/admin')
  loginAdmin(@Body() dto: AdminLoginDto) {
    return this.authService.adminLogin(dto.email, dto.password);
  }

  // ----------------- Google login (for user + doctor) -----------------
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
