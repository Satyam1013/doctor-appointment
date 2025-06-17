import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDoctorsTeamDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  image!: string;
}

export class UpdateDoctorsTeamDto extends PartialType(CreateDoctorsTeamDto) {}
