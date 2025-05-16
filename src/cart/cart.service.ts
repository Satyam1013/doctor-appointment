// src/cart/cart.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartItem } from './cart.schema';
import { Product } from '../product/product.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('CartItem') private readonly cartModel: Model<CartItem>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async addToCart(userId: string, productId: string, quantity: number) {
    const product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException('Product not found');

    const existing = await this.cartModel.findOne({
      userId,
      product: product._id,
    });

    if (existing) {
      existing.quantity += quantity;
      return existing.save();
    }

    const newItem = new this.cartModel({
      userId,
      product: product._id,
      quantity,
    });

    return newItem.save();
  }

  async getCart(userId: string) {
    return this.cartModel.find({ userId }).populate('product').exec();
  }

  async removeFromCart(id: string) {
    return this.cartModel.findByIdAndDelete(id);
  }

  async updateQuantity(id: string, quantity: number) {
    return this.cartModel.findByIdAndUpdate(id, { quantity }, { new: true });
  }

  async clearCart(userId: string) {
    return this.cartModel.deleteMany({ userId });
  }
}
