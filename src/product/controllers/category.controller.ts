import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from '../services';
import { CategoryCreateDto } from '../dtos';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  findAllCategories() {
    return this.categoryService.findAll()
  }

  @Get('/:id')
  findCategoryById(@Param('id') categoryId: string) {
    return this.categoryService.findCategoryById(categoryId)
  }

  @Post()
  createCategory(@Body() categoryData: CategoryCreateDto) {
    return this.categoryService.createCategory(categoryData);
  }

  @Put('/:id')
  updateCategory(@Param('id') categoryId: string, @Body() categoryData: CategoryCreateDto) {
    return this.categoryService.updateCategory(categoryId, categoryData);
  }

  @Delete('/:id')
  removeCategory(@Param('id') categoryId: string) {
    return this.categoryService.removeCategory(categoryId);
  }
}
