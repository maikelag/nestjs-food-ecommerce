
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../models';
import { CategoryCreateDto } from '../dtos';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async findCategoryById(categoryId: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new HttpException('Category not exist', HttpStatus.BAD_REQUEST);
    }
    return category;
  }

  async createCategory(categoryData: CategoryCreateDto): Promise<CategoryEntity> {
    return this.categoryRepository.save(categoryData);
  }

  async updateCategory(categoryId: string, categoryData: CategoryCreateDto): Promise<any> {
    return this.categoryRepository.update(categoryId, categoryData);
  }

  async removeCategory(id: string) {
    const categoryToDelete = await this.categoryRepository.findOne({
      where: { id },
    });
    return this.categoryRepository.remove(categoryToDelete);
  }

}
