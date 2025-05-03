import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';
import { User, UserRole } from '../user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // ----------------- Signup methods -----------------
  signupUser(dto: SignupDto) {
    return this.signup(dto, UserRole.USER);
  }

  signupDoctor(dto: SignupDto) {
    return this.signup(dto, UserRole.DOCTOR);
  }

  signupAdmin(dto: SignupDto) {
    return this.signup(dto, UserRole.ADMIN);
  }

  private async signup(dto: SignupDto, role: UserRole) {
    // Correct query for finding a user by email
    const user = await this.userModel.findOne({ email: dto.email });
    if (user) throw new ConflictException('Email already registered');

    const hashed = await bcrypt.hash(dto.password, 10);
    const newUser = await this.userModel.create({
      email: dto.email,
      firstName: dto.firstName,
      password: hashed,
      role,
    });

    return {
      access_token: await this.jwtService.signAsync({
        sub: newUser._id,
        email: newUser.email,
        role: newUser.role,
      }),
    };
  }

  // ----------------- Login methods -----------------
  async loginUser(email: string, password: string) {
    return this.login(email, password, UserRole.USER);
  }

  async loginDoctor(email: string, password: string) {
    return this.login(email, password, UserRole.DOCTOR);
  }

  async adminLogin(email: string, password: string) {
    return this.login(email, password, UserRole.ADMIN);
  }

  private async login(email: string, password: string, role: UserRole) {
    const user = await this.userModel.findOne({ email });

    if (!user || user.role !== role) {
      throw new ConflictException(`Invalid credentials or not a ${role}`);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ConflictException('Invalid credentials');
    }

    return {
      access_token: await this.jwtService.signAsync({
        sub: user._id,
        email: user.email,
        role: user.role,
      }),
    };
  }
}
