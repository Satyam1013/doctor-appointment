import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDoctorsTeamDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  image!: string;
}

export class UpdateDoctorsTeamDto extends PartialType(CreateDoctorsTeamDto) {}

class TeamEntry {
  @IsString()
  id!: string;

  @IsString()
  date!: string;

  @IsString()
  time!: string;
}

export class AssignDoctorTeamsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeamEntry)
  teams!: TeamEntry[];
}
