/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
  Patch,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './product.service';
import { Product } from './product.schema';
import { memoryStorage } from 'multer';
import { uploadBufferToCloudinary } from '../utils/cloudinary';

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
  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: memoryStorage(),
    }),
  )
  async createProduct(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any, // Ideally, use DTO here
  ): Promise<Product> {
    const imageUrls: string[] = [];

    for (const file of files) {
      // You can upload directly from buffer without saving a temp file
      const result = await uploadBufferToCloudinary(
        file.buffer,
        file.originalname,
      );
      imageUrls.push(result.secure_url);
    }

    // Parse fields carefully
    const parsedProduct: Partial<Product> = {
      title: body.title,
      categoryKey: body.categoryKey,
      description: body.description,
      price: parseFloat(body.price),
      originalPrice: body.originalPrice
        ? parseFloat(body.originalPrice)
        : undefined,
      quantity: body.quantity ? parseInt(body.quantity) : undefined,
      bestSeller: body.bestSeller === 'true',
      recommended: body.recommended === 'true',
      combos: body.combos === 'true',
      tags: Array.isArray(body['tags[]'])
        ? body['tags[]']
        : body['tags[]']
          ? [body['tags[]']]
          : [],
      images: imageUrls,
      productDetails: body.productDetails,
      benefits: body.benefits,
      howToUse: body.howToUse,
      ingredients: body.ingredients,
      caution: body.caution,
      information: body.information,
      contents: body.contents,
    };

    return this.productsService.create(parsedProduct);
  }

  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: memoryStorage(),
    }),
  )
  async updateProduct(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
  ): Promise<Product> {
    const imageUrls: string[] = [];

    if (files && files.length) {
      for (const file of files) {
        const result = await uploadBufferToCloudinary(
          file.buffer,
          file.originalname,
        );
        imageUrls.push(result.secure_url);
      }
    }

    // Parse body and merge images with imageUrls or use imageUrls as new images array
    const updates: Partial<Product> = {
      title: body.title,
      categoryKey: body.categoryKey,
      description: body.description,
      price: parseFloat(body.price),
      originalPrice: body.originalPrice
        ? parseFloat(body.originalPrice)
        : undefined,
      quantity: body.quantity ? parseInt(body.quantity) : undefined,
      bestSeller: body.bestSeller === 'true',
      recommended: body.recommended === 'true',
      combos: body.combos === 'true',
      tags: Array.isArray(body['tags[]'])
        ? body['tags[]']
        : body['tags[]']
          ? [body['tags[]']]
          : [],
      productDetails: body.productDetails,
      benefits: body.benefits,
      howToUse: body.howToUse,
      ingredients: body.ingredients,
      caution: body.caution,
      information: body.information,
      contents: body.contents,
    };

    if (imageUrls.length) {
      // Merge existing images from body (in case user didn't upload new ones)
      const existingImages = Array.isArray(body.images)
        ? body.images
        : body.images
          ? [body.images]
          : [];

      updates.images = [...existingImages, ...imageUrls];
    }

    const updatedProduct = await this.productsService.update(id, updates);
    if (!updatedProduct) throw new NotFoundException('Product not found');
    return updatedProduct;
  }

  @Patch(':id/favorite')
  async updateFavoriteStatus(
    @Param('id') id: string,
    @Body('isFavorite') isFavorite: boolean,
  ): Promise<Product> {
    const updatedProduct = await this.productsService.updateFavorite(
      id,
      isFavorite,
    );
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
