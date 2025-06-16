// blog.dto.ts
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty() title!: string;
  @IsNotEmpty() date!: string;
  @IsNotEmpty() author!: string;
  @IsNotEmpty() category!: string;
  @IsArray() images!: string[];
  @IsNotEmpty() description!: string;
  @IsNotEmpty() content!: string;
}

export class EditBlogDto {
  @IsString() title?: string;
  @IsString() date?: string;
  @IsString() author?: string;
  @IsString() category?: string;
  @IsArray() images?: string[];
  @IsString() description?: string;
  @IsString() content?: string;
}
