import { IsNotEmpty, IsString, IsInt, IsNumber, IsBoolean, IsArray } from 'class-validator';
import { CategoryEntity } from '../models';

export class ProductCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsInt()
  amount?: number;

  @IsNumber()
  priceSale?: number;

  @IsNumber()
  cost?: number;

  @IsBoolean()
  isOnSale?: boolean;

  @IsArray()
  categories: CategoryEntity[];

  @IsString()
  image?: string;

  @IsArray()
  images?: string[];

}
