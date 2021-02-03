import { IsString, IsInt, IsNumber, IsBoolean, IsArray } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { ProductCreateDto } from './product-create.dto';
import { CategoryEntity } from '../models';

export class ProductUpdateDto extends PartialType(ProductCreateDto) {
  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsInt()
  amount?: number;

  @IsNumber()
  priceSale?: number;

  @IsNumber()
  cost?: number;

  @IsBoolean()
  isOnSale?: boolean;

  @IsArray()
  categories?: CategoryEntity[];

  @IsString()
  image?: string;
}

