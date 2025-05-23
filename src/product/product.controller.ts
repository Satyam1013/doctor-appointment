import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './product.service';
import { Product } from './product.schema';

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

  @Post()
  async createProduct(@Body() productData: Partial<Product>): Promise<Product> {
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
