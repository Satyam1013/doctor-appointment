import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (user) throw new ConflictException('Email already registered');

    const hashed = await bcrypt.hash(dto.password, 10);
    const newUser = await this.userService.create({
      email: dto.email,
      firstName: dto.firstName,
      password: hashed,
    });

    return {
      access_token: await this.jwtService.signAsync({
        sub: newUser._id,
        email: newUser.email,
      }),
    };
  }

  async googleLogin(req: any) {
    if (!req.user) {
      return 'No user from Google';
    }
    const user = await this.userService.findByEmail(req.user.email);
    if (!user) {
      await this.userService.create({
        email: req.user.email,
        firstName: req.user.firstName,
        isGoogle: true,
      });
    }
    return {
      message: 'Google login successful',
      user: req.user,
      token: await this.jwtService.signAsync({
        sub: req.user._id,
        email: req.user.email,
      }),
    };
  }
}
