import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';
import { User } from '../user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // ----------------- Signup method -----------------
  async signup(dto: SignupDto) {
    const existingUser = await this.userModel.findOne({ email: dto.email });
    if (existingUser) throw new ConflictException('Email already registered');

    const hashed = await bcrypt.hash(dto.password, 10);
    const newUser = await this.userModel.create({
      email: dto.email,
      firstName: dto.firstName,
      password: hashed,
      mobile: dto.mobile,
      balance: 0,
    });

    return {
      access_token: await this.jwtService.signAsync({
        sub: newUser._id,
        email: newUser.email,
      }),
    };
  }

  // ----------------- Login method -----------------
  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new ConflictException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ConflictException('Invalid credentials');

    return {
      access_token: await this.jwtService.signAsync({
        sub: user._id,
        email: user.email,
      }),
    };
  }
}
