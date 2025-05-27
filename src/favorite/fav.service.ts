import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FavItem } from './fav.schema';
import { Product } from '../product/product.schema';

@Injectable()
export class FavService {
  constructor(
    @InjectModel('FavItem') private readonly favModel: Model<FavItem>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async addToFavorite(userId: string, productId: string, quantity: number) {
    const product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException('Product not found');

    const existing = await this.favModel.findOne({
      userId,
      product: product._id,
    });

    if (existing) {
      existing.quantity += quantity;
      return existing.save();
    }

    const newItem = new this.favModel({
      userId,
      product: product._id,
      quantity,
    });

    return newItem.save();
  }

  async getFavorite(userId: string) {
    return this.favModel.find({ userId }).populate('product').exec();
  }

  async removeFromFavorite(id: string) {
    return this.favModel.findByIdAndDelete(id);
  }

  async updateQuantity(id: string, quantity: number) {
    return this.favModel.findByIdAndUpdate(id, { quantity }, { new: true });
  }

  async clearFavorite(userId: string) {
    return this.favModel.deleteMany({ userId });
  }
}
