import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'supersecret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
