/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './product.service';
import { Product } from './product.schema';
import { memoryStorage } from 'multer';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { uploadToCloudinary } from '../utils/cloudinary';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    const product = await this.productsService.findOne(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  // Upload multiple images along with product data
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: memoryStorage(),
    }),
  )
  async createProduct(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() productData: Partial<Product>,
  ): Promise<Product> {
    // Upload each image file to Cloudinary and collect URLs
    const imageUrls: string[] = [];

    for (const file of files) {
      const tempPath = path.join(os.tmpdir(), `product-${Date.now()}.jpg`);
      try {
        fs.writeFileSync(tempPath, file.buffer);
        const result = await uploadToCloudinary(tempPath);
        imageUrls.push(result.secure_url);
      } finally {
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
      }
    }

    // Assign uploaded URLs to product images array
    productData.images = imageUrls;

    return this.productsService.create(productData);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updates: Partial<Product>,
  ): Promise<Product> {
    const updatedProduct = await this.productsService.update(id, updates);
    if (!updatedProduct) throw new NotFoundException('Product not found');
    return updatedProduct;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<{ message: string }> {
    const deleted = await this.productsService.delete(id);
    if (!deleted) throw new NotFoundException('Product not found');
    return { message: 'Product deleted successfully' };
  }
}
