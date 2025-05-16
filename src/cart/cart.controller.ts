import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  add(@Body() body: { userId: string; productId: string; quantity: number }) {
    return this.cartService.addToCart(
      body.userId,
      body.productId,
      body.quantity,
    );
  }

  @Get(':userId')
  get(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() body: { quantity: number }) {
    return this.cartService.updateQuantity(id, body.quantity);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.removeFromCart(id);
  }

  @Delete('clear/:userId')
  clear(@Param('userId') userId: string) {
    return this.cartService.clearCart(userId);
  }
}
