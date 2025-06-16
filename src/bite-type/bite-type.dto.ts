import { IsArray, IsOptional, IsString } from 'class-validator';

export class BiteTypeDto {
  @IsString()
  title!: string;

  @IsArray()
  @IsString({ each: true })
  videos!: string[];
}

export class UpdateBiteTypeDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  videos?: string[];
}
