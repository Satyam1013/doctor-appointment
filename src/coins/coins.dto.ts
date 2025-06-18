import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCoinsDto {
  @IsNumber() coins?: number;
  @IsNumber() bonus?: number;
  @IsNumber() purchased?: number;
  @IsNumber() consultation?: number;

  @IsNotEmpty()
  @IsMongoId()
  userId!: string;
}

export class UpdateCoinsDto extends PartialType(CreateCoinsDto) {}
