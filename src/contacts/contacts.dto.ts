import { IsArray, IsString } from 'class-validator';

export class CreateContactUsDto {
  @IsArray()
  @IsString({ each: true })
  videos!: string[];
}
