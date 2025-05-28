import { IsNotEmpty, IsString } from 'class-validator';

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

export class UpdateAlignersDto {
  @IsString()
  photo?: string;

  @IsString()
  video?: string;

  @IsString()
  qualityText?: string;
}
