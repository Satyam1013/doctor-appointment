import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddCenterDto {
  @IsNotEmpty()
  cityName!: string;
}

export class AddClinicDto {
  @IsNotEmpty() clinicName!: string;
  @IsNotEmpty() address!: string;
  @IsNotEmpty() timeFrom!: string;
  @IsNotEmpty() timeTo!: string;
  @IsNotEmpty() centerNumber!: string;
  @IsOptional() directions?: string;
}

export class EditClinicDto {
  clinicName?: string;
  address?: string;
  timeFrom?: string;
  timeTo?: string;
  centerNumber?: string;
  directions?: string;
}
