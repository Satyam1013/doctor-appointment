// contact-us.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class CreateContactUsDto {
  @IsString()
  name!: string;

  @IsString()
  email!: string;

  @IsString()
  message!: string;

  @IsOptional()
  @IsString()
  video?: string;
}
