import { Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import {
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity('Products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ length: 160 })
  name: string;

  @Column('text')
  description: string;

  @Column({ length: 160, nullable: true })
  image: string;

  @Column('int')
  amount: number;

  @Column({ nullable: true, type: 'float' })
  priceSale: number;

  @Column({ nullable: true, type: 'float' })
  cost: number;

  @Column({ nullable: true, type: 'boolean' })
  isOnSale: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToMany(type => CategoryEntity, category => category.products)
  @JoinTable()
  categories: CategoryEntity[];
}
