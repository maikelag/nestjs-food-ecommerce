import {
  Column,
  ManyToMany,
} from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('Categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ length: 160 })
  category: string;

  @ManyToMany(
    type => ProductEntity,
    product => product.categories,
  )
  products: ProductEntity[];
}
