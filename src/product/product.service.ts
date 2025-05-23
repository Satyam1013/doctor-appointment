import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product | null> {
    return this.productModel.findById(id).exec();
  }

  async create(data: Partial<Product>): Promise<Product> {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  async update(id: string, updates: Partial<Product>): Promise<Product | null> {
    const updated = await this.productModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Product not found');
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
