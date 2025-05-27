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

  async addToFavorite(userId: string, productId: string) {
    const product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException('Product not found');

    const favItem = await this.favModel.findOne({
      userId,
      product: product._id,
    });

    if (favItem) {
      return favItem;
    }

    const newFav = new this.favModel({
      userId,
      product: product._id,
    });

    return newFav.save();
  }

  async getFavorite(userId: string) {
    return this.favModel.find({ userId }).populate('product').exec();
  }

  async removeFromFavorite(id: string, userId: string) {
    const item = await this.favModel.findOne({ _id: id, userId });
    if (!item) throw new NotFoundException('Favorite item not found');
    return item.deleteOne();
  }

  async clearFavorite(userId: string) {
    return this.favModel.deleteMany({ userId });
  }
}
