import { IsEmail, IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  mobile?: string;

  @IsOptional()
  @IsString()
  ageGroup?: string;

  @IsOptional()
  @IsString()
  teethIssue?: string;

  @IsOptional()
  @IsString()
  problemText?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  medicalHistory?: string[];

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  smoker?: string;

  @IsOptional()
  @IsString()
  availability?: string;
}
