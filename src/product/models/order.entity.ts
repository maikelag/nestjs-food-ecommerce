import {
    Column,
    ManyToMany,
    OneToMany,
  } from 'typeorm';
  import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';
  
  @Entity('orders')
  export class OrderEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @Column()
    shippingAddress: string;

    @Column()
    city: string
    
    @Column()
    zip: string

    @Column()
    status: string;

    @Column()
    phoneNumber: string;

    @Column()
    dateOrdered: Date;
  
    @OneToMany(() => OrderItemEntity, orderItem => orderItem.order)
    orderItems: OrderItemEntity[]
  }
  