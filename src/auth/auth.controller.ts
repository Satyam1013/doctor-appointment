import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';

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
}
