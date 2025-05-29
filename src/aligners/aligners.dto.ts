import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateAlignersDto {
  @IsArray()
  @IsString({ each: true })
  photo!: string[];

  @IsArray()
  @IsString({ each: true })
  video!: string[];

  @IsNotEmpty()
  @IsString()
  price!: string;
}

export class UpdateAlignersDto {
  @IsArray()
  @IsString({ each: true })
  photo?: string[];

  @IsArray()
  @IsString({ each: true })
  video?: string[];

  @IsString()
  price?: string;
}
