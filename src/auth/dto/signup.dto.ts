// signup.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  mobile!: string;
}
