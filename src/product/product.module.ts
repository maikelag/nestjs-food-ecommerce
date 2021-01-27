import { Module } from '@nestjs/common';
import { ProductController, CategoryController } from './controllers';
import { ProductService, CategoryService } from './services';

@Module({
  controllers: [ProductController, CategoryController],
  providers: [ProductService, CategoryService]
})
export class ProductModule {}
