import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from './category.service';
import { CategoryEntity } from '../models';

const testCategory1 = 'Test Category 1';
const cat1: CategoryEntity = new CategoryEntity();
cat1.category = testCategory1;

const cat2: CategoryEntity = new CategoryEntity();
cat1.category = 'Tazas';

const categoryArray = [
  cat1,
  cat2
];

const oneCategory = new CategoryEntity();
oneCategory.category = 'Targets';

describe('CategoryService', () => {
  let service: CategoryService;
  let repo: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(categoryArray),
            findOne: jest.fn().mockResolvedValue(oneCategory),
            create: jest.fn().mockReturnValue(oneCategory),
            save: jest.fn(),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolee is true to not crash
            update: jest.fn().mockResolvedValue(true),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolee is true to not crash
            delete: jest.fn().mockResolvedValue(true),
          }
        }],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repo = module.get<Repository<CategoryEntity>>(getRepositoryToken(CategoryEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of cats', async () => {
      const cats = await service.findAll();
      expect(cats).toEqual(categoryArray);
    });
  });

  describe('getOne', () => {
    it('should get a single category', () => {
      const repoSpy = jest.spyOn(repo, 'findOne');
      expect(service.findCategoryById('a uuid')).resolves.toEqual(oneCategory);
      expect(repoSpy).toBeCalledWith({ where: { id: 'a uuid' } });
    });
  });

  describe('insertOne', () => {
    it('should successfully insert a category', () => {
      expect(
        service.createCategory({
          category: 'Targets'
        }),
      ).resolves.toEqual(undefined);
      expect(repo.save).toBeCalledTimes(1);
    });
  });

  describe('deleteOne', () => {
    it('should return the entity deleted', () => {
      expect(service.removeCategory('a uuid')).resolves.toEqual({ deleted: true });
    });
  });
});
