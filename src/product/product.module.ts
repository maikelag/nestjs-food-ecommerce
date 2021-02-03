import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController, CategoryController, OrderController } from './controllers';
import { ProductService, CategoryService, OrderService } from './services';
import { CategoryEntity, OrderEntity, OrderItemEntity, ProductEntity } from './models';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, ProductEntity, OrderEntity, OrderItemEntity]),
    MulterModule.register({
      dest: './public'
    })
  ],
  controllers: [ProductController, CategoryController, OrderController],
  providers: [ProductService, CategoryService, OrderService]
})
export class ProductModule {}
