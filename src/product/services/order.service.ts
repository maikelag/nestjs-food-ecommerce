
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity, OrderEntity, OrderItemEntity, ProductEntity } from '../models';
import { CategoryCreateDto, OrderCreateDto } from '../dtos';
import { ProductService } from './product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private productService: ProductService
  ) {}

  async findAllOrder() {
    return this.orderRepository.find({relations: ['orderItems']});
  }

  async createOrder(orderData: OrderCreateDto) {
    const orderItemsList = [];
    const newOrder = await this.orderRepository.create({
      city: orderData.city,
      phoneNumber: orderData.phoneNumber,
      shippingAddress: orderData.shippingAddress,
      status: 'Pendiente',
      dateOrdered: new Date(),
      zip: orderData.zip
    });
    const orderSaved = await this.orderRepository.save(newOrder);
    for(const orderItem of orderData.orderItems) {
      const product = await this.productService.findProductById(orderItem.productId);
      console.log(product);
      const newOrderItemSaved = await this.createOrderItem(product, orderItem.quantity, orderSaved);
      orderItemsList.push(newOrderItemSaved);
    }
    orderSaved.orderItems = orderItemsList;
    await this.orderRepository.save(orderSaved);
    return newOrder;
  }

  private async createOrderItem(product: ProductEntity, quantity: number, order: OrderEntity): Promise<OrderItemEntity> {
    const orderItem = await this.orderItemRepository.create({
      order, product, quantity
    });
    return this.orderItemRepository.save(orderItem);
  }

}
