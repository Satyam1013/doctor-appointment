import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';

export class CreateCoinsDto {
  @IsNumber() coins?: number;
  @IsNumber() bonus?: number;
  @IsNumber() purchased?: number;
  @IsNumber() consultation?: number;
}

export class UpdateCoinsDto extends PartialType(CreateCoinsDto) {}
