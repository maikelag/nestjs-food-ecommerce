import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CategoryCreateDto {
  @IsNotEmpty()
  @IsString()
  category: string;

}

