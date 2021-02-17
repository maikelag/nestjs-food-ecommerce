import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, Put, Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor, } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../../common/utils/file-uploading.utils';
import { ProductService } from '../services';
import { ProductCreateDto, ProductUpdateDto } from '../dtos';
import { PaginationParams } from '../interfaces/pagination-param.interface';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  findProducts() {
    return this.productService.findAll()
  }

  @Get('/paginate')
  paginateProduct(@Query() { offset, limit }: PaginationParams) {
    return this.productService.paginateProducts(offset, limit);
  }

  @Get(':id')
  findProductById(@Param('id') productId: string) {
    return this.productService.findProductById(productId);
  }

  @Get('/category/:categoryId')
  findProductByCategory(@Param('categoryId') categoryId: string) {
    return this.productService.findProductByCategory(categoryId);
  }

  @Delete(':id')
  deleteProductById(@Param('id') productId: string) {
    return this.productService.removeProduct(productId);
  }

  @Post()
  createProduct(@Body() productData: ProductCreateDto) {
    return this.productService.createProduct(productData);
  }

  @Put(':id')
  updateProduct(@Param('id') productId: string, @Body() productData: ProductUpdateDto) {
    return this.productService.updateProduct(productId, productData);
  }

  // -------------------------------------------------------------------------------------------------------------------
  @Post()
  @UseInterceptors(
    FileInterceptor('image'),
  )
  async uploadedFile(@UploadedFile() file) {
    console.log(file);
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }


  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    console.log(response);
    return response;
  }

  @Post(':id/images')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadImagesOfProduct(@UploadedFiles() files, @Param('id') productId: string) {
    console.log('UPLOADING IMAGES');
    const imagesNames = [];
    files.forEach(file => {
      imagesNames.push(file.filename);
    });
    return this.productService.addImagesToProduct(productId, imagesNames);
  }
}
