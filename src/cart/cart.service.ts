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

    // If quantity is not set or is 0
    if (product.quantity === undefined || product.quantity <= 0) {
      throw new Error('Product is out of stock');
    }

    // If requested quantity > available stock
    if (quantity > product.quantity) {
      throw new Error(`Only ${product.quantity} item(s) in stock`);
    }

    const existing = await this.cartModel.findOne({
      userId,
      product: product._id,
    });

    if (existing) {
      const newCartQuantity = existing.quantity + quantity;

      if (newCartQuantity > product.quantity) {
        throw new Error(
          `Cannot add ${quantity} item(s). Only ${product.quantity - existing.quantity} more item(s) available`,
        );
      }

      existing.quantity = newCartQuantity;
      await existing.save();

      // Decrease product stock accordingly
      product.quantity -= quantity;
      await product.save();

      return existing;
    }

    const newItem = new this.cartModel({
      userId,
      product: product._id,
      quantity,
    });

    product.quantity -= quantity;
    await product.save();

    return newItem.save();
  }

  async getCart(userId: string) {
    return this.cartModel.find({ userId }).populate('product').exec();
  }

  async removeFromCart(id: string) {
    const item = await this.cartModel.findById(id);
    if (!item) throw new NotFoundException('Cart item not found');

    const product = await this.productModel.findById(item.product);
    if (product) {
      product.quantity = (product.quantity ?? 0) + item.quantity;
      await product.save();
    }

    return item.deleteOne();
  }

  async updateQuantity(id: string, quantity: number) {
    const cartItem = await this.cartModel.findById(id);
    if (!cartItem) throw new NotFoundException('Cart item not found');

    const product = await this.productModel.findById(cartItem.product);
    if (!product) throw new NotFoundException('Product not found');

    if (product.quantity === undefined || product.quantity < quantity) {
      throw new Error(`Only ${product.quantity ?? 0} item(s) available`);
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    return cartItem;
  }

  async clearCart(userId: string) {
    return this.cartModel.deleteMany({ userId });
  }
}
