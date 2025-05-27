// src/cart/cart.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavService } from './fav.service';
import { FavController } from './fav.controller';
import { FavItem, FavItemSchema } from './fav.schema';
import { Product, ProductSchema } from 'src/product/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FavItem.name, schema: FavItemSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  providers: [FavService],
  controllers: [FavController],
})
export class FavModule {}
