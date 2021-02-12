import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryCreateDto } from '../dtos'
import { CategoryService } from '../services';

const testCategory1 = 'Test Category 1';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                category: testCategory1
              },
              {
                category: 'Muebles'
              }
            ]),
            findCategoryById: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                category: testCategory1,
                id,
              }),
            ),
            createCategory: jest
              .fn()
              .mockImplementation((categoryData: CategoryCreateDto) =>
                Promise.resolve({ id: 'a uuid', ...categoryData }),
              ),
            removeCategory: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                category: testCategory1,
                id,
                products: []
              }),
            ),
            updateCategory: jest
              .fn()
              .mockImplementation((id: string, cat: CategoryCreateDto) =>
                Promise.resolve({ id: 'a uuid', ...cat }),
              ),
          }
        }
      ]
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCategories', () => {
    it('should get an array of categories', async () => {
      await expect(controller.findAllCategories()).resolves.toEqual([
        {
          category: testCategory1,
        },
        {
          category: 'Muebles'
        }
      ]);
    });
  });

  describe('getById', () => {
    it('should get a single categorie', async () => {
      await expect(controller.findCategoryById('a strange id')).resolves.toEqual({
        category: testCategory1,
        id: 'a strange id',
      });
      await expect(controller.findCategoryById('a different id')).resolves.toEqual({
        category: testCategory1,
        id: 'a different id',
      });
    });
  });

  describe('newCategory', () => {
    it('should create a new category', async () => {
      const newCategoryDTO: CategoryCreateDto = {
        category: 'New Category 1',
      };
      await expect(controller.createCategory(newCategoryDTO)).resolves.toEqual({
        id: 'a uuid',
        ...newCategoryDTO,
      });
    });
  });

  describe('deleteCategory', () => {
    it('should return that it deleted a category', async () => {
      await expect(controller.removeCategory('a uuid that exists')).resolves.toEqual(
        {
          category: testCategory1,
          id: 'a uuid that exists',
          products: []
        },
      );
    });
    it('should return that it did not delete a cat', async () => {
      const categoryDeleted = {
        category: testCategory1,
          id: '',
        products: []
      };
      const deleteSpy = jest
        .spyOn(service, 'removeCategory')
        .mockResolvedValueOnce({ ...categoryDeleted });
      await expect(
        controller.removeCategory('a uuid that does not exist'),
      ).resolves.toEqual({
        category: testCategory1,
        id: '',
        products: []
      });
      expect(deleteSpy).toBeCalledWith('a uuid that does not exist');
    });
  });

  describe('updateCategory', () => {
    it('should update a new cat', async () => {
      const newCatDTO: CategoryCreateDto = {
        category: 'Ropa',
      };
      await expect(controller.updateCategory('a uuid', newCatDTO)).resolves.toEqual({
        id: 'a uuid',
        ...newCatDTO,
      });
    });
  });
});
