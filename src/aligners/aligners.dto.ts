/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAlignersDto {
  @IsNotEmpty()
  @IsString()
  photo!: string;

  @IsNotEmpty()
  @IsString()
  video!: string;

  @IsNotEmpty()
  @IsString()
  qualityText!: string;
}

export class UpdateAlignersDto extends PartialType(CreateAlignersDto) {}
