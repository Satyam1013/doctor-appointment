import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email!: string;

  @IsString()
  firstName!: string;

  @MinLength(6)
  password!: string;
}
