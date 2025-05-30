import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FavItem } from './fav.schema';
import { Product } from '../product/product.schema';

@Injectable()
export class FavService {
  constructor(
    @InjectModel('FavItem') private readonly favModel: Model<FavItem>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async addToFavorite(userId: string, productId: string) {
    const product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException('Product not found');

    const existingFav = await this.favModel.findOne({
      userId,
      product: product._id,
    });

    if (existingFav) {
      return existingFav.populate('product'); // ✅ Ensure populated response
    }

    const newFav = new this.favModel({
      userId,
      product: product._id,
    });

    await newFav.save();

    return this.favModel.findById(newFav._id).populate('product'); // ✅ Fully populated favorite
  }

  async getFavorite(userId: string) {
    return this.favModel.find({ userId }).populate('product').exec();
  }

  async removeFromFavorite(productId: string, userId: string) {
    const item = await this.favModel.findOne({
      product: new Types.ObjectId(productId),
      userId,
    });

    if (!item) throw new NotFoundException('Favorite item not found');

    return item.deleteOne();
  }

  async clearFavorite(userId: string) {
    return this.favModel.deleteMany({ userId });
  }
}
