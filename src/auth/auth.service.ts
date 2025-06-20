import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';
import { User } from '../user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DoctorSignupDto } from 'src/doctor/doc.dto';
import { DoctorService } from 'src/doctor/doc.service';
import { DoctorDocument } from 'src/doctor/doc.schema';
import * as crypto from 'crypto';
import { MailerService } from 'src/mailer/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly doctorService: DoctorService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

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
        sub: doctor._id.toString(),
        email: doctor.email,
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
      }),
    };
  }

  async loginAdmin(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (user.role !== 'admin') throw new UnauthorizedException('Access denied');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user._id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      user: { _id: user._id, email: user.email },
    };
  }

  async requestPasswordReset(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('User not found');

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 10);

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;
    await user.save();

    await this.mailerService.sendResetPasswordEmail(email, token);

    return { message: 'Reset email sent successfully' };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) throw new BadRequestException('Invalid or expired token');

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return { message: 'Password reset successfully' };
  }
}
