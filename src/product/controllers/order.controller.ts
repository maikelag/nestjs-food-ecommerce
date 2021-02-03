import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from '../services';
import { CategoryCreateDto, OrderCreateDto } from '../dtos';
import { OrderService } from '../services/order.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  findAllCategories() {
    return this.orderService.findAllOrder();
  }

  @Post()
  createCategory(@Body() orderData: OrderCreateDto) {
    return this.orderService.createOrder(orderData);
  }

}
