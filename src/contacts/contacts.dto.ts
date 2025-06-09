import { IsString } from 'class-validator';

export class CreateContactUsDto {
  @IsString()
  video!: string;
}
