import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateDoctorsTeamDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  image!: string;

  @IsOptional()
  @IsDateString()
  availableDate?: string;
}

export class UpdateDoctorsTeamDto extends PartialType(CreateDoctorsTeamDto) {}
