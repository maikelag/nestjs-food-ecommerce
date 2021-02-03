
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../models';
import { ProductCreateDto, ProductUpdateDto } from '../dtos';
import { removeImage } from '../../common/utils/file-uploading.utils';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find({relations: ['categories']});
  }

  async findProductById(productId: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { id: productId }, relations: ['categories'] });
    if (!product) {
      throw new HttpException('Product not exist', HttpStatus.BAD_REQUEST);
    }
    return product;
  }

  async createProduct(productData: ProductCreateDto): Promise<any> {
    const productFind = await this.productRepository.findOne({
      where: { name: productData.name },
    });
    if (productFind) {
      throw new HttpException('Product already exist', HttpStatus.BAD_REQUEST);
    }
    const product = await this.productRepository.create(productData);
    await this.productRepository.save(product);
    return product;
  }

  async updateProduct(productId: string, productData: ProductUpdateDto) {
    const product = await this.findProductById(productId);
    product.categories = productData.categories;
    await this.productRepository.save(product);
    delete productData.categories;
    await this.productRepository.update(productId, productData);
    return await this.findProductById(productId);
  }

  async addImagesToProduct(productId: string, imagesNameFile: Array<string>) {
    const product = await this.findProductById(productId);
    product.images = imagesNameFile;
    await this.productRepository.save(product);
    return this.findProductById(productId);
  }

  async removeProduct(id: string) {
    const productToDelete = await this.productRepository.findOne({
      where: { id },
    });
    if(productToDelete.images?.length > 0) {
      await this.removeImagesOfProducts(productToDelete.images);
    }
    return this.productRepository.remove(productToDelete);
  }

  private async removeImagesOfProducts(imagesName: string[]): Promise<void> {
    for(let image of imagesName) {
      await removeImage(image);
      console.log('Imagen eliminada corrwectamente')
    }
  }

}
