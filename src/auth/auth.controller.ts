import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { DoctorSignupDto } from 'src/doctor/doc.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 🔐 Signup route
  @Post('signup/user')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  // 🔓 Login route
  @Post('login/user')
  login(@Body() dto: { email: string; password: string }) {
    return this.authService.login(dto.email, dto.password);
  }

  // Doctor Signup
  @Post('signup/doctor')
  signupDoctor(@Body() dto: DoctorSignupDto) {
    return this.authService.signupDoctor(dto);
  }

  // Doctor Login
  @Post('login/doctor')
  loginDoctor(@Body() dto: { email: string; password: string }) {
    return this.authService.loginDoctor(dto.email, dto.password);
  }
}
