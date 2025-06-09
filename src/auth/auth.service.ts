import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';
import { User } from '../user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DoctorSignupDto } from 'src/doctor/doc.dto';
import { DoctorService } from 'src/doctor/doc.service';
import { DoctorDocument } from 'src/doctor/doc.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly doctorService: DoctorService,
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

  async signupDoctor(dto: DoctorSignupDto): Promise<{ access_token: string }> {
    const existing: DoctorDocument | null =
      await this.doctorService.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email already registered');

    const hashed = await bcrypt.hash(dto.password, 10);
    const doctor: DoctorDocument = await this.doctorService.create({
      ...dto,
      password: hashed,
    });

    return {
      access_token: await this.jwtService.signAsync({
        sub: doctor._id.toString(), // ✅ ._id now works!
        email: doctor.email,
        role: 'doctor',
      }),
    };
  }

  async loginDoctor(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const doctor: DoctorDocument | null =
      await this.doctorService.findByEmail(email);
    if (!doctor) throw new ConflictException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) throw new ConflictException('Invalid credentials');

    return {
      access_token: await this.jwtService.signAsync({
        sub: doctor._id.toString(),
        email: doctor.email,
        role: 'doctor',
      }),
    };
  }
}
