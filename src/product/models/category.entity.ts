import {
  Column,
  ManyToMany,
} from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('Categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 160 })
  category: string;

  @ManyToMany(
    type => ProductEntity,
    product => product.categories,
  )
  products: ProductEntity[];
}
