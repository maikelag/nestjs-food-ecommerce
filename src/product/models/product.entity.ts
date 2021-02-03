import { Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import {
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { OrderItemEntity } from './order-item.entity';

@Entity('Products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ length: 160 })
  name: string;

  @Column('text')
  description: string;

  @Column({ length: 160, nullable: true })
  image: string;

  @Column("text", { array: true, default: "{}" })
  images: string[];

  @Column({nullable: true, type: 'int'})
  amount: number;

  @Column({ nullable: true, type: 'float' })
  priceSale: number;

  @Column({ nullable: true, type: 'float' })
  cost: number;

  @Column({ nullable: true, type: 'boolean' })
  isOnSale: boolean;

  @Column({nullable: true, type: 'text'})
  status: string;

  @Column({nullable: true, type: 'text'})
  serialNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToMany(type => CategoryEntity, category => category.products)
  @JoinTable()
  categories: CategoryEntity[];

  
  @OneToMany(() => OrderItemEntity, orderItems => orderItems.product)
  orderItems: OrderItemEntity[]
}
