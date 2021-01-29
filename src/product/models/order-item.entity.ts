import {
    Column,
    ManyToMany,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
  import { ProductEntity } from './product.entity';
  
  @Entity('order-item')
  export class OrderItemEntity {
    @PrimaryGeneratedColumn('uuid') 
    id: string;
  
    @OneToMany(() => ProductEntity, product => product.orderItems)
    product: ProductEntity;

    @Column()
    quantity: number;

    @ManyToOne(() => OrderEntity, order => order.orderItems)
    order: OrderEntity;
  }
  