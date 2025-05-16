import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

export interface AuthenticatedRequest extends ExpressRequest {
  user: {
    _id: string;
  };
}

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  add(
    @Req() req: AuthenticatedRequest,
    @Body() body: { productId: string; quantity: number },
  ) {
    const userId = req.user._id;
    return this.cartService.addToCart(userId, body.productId, body.quantity);
  }

  @Get()
  get(@Req() req: AuthenticatedRequest) {
    const userId = req.user._id;
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

  @Delete('clear')
  clear(@Req() req: AuthenticatedRequest) {
    const userId = req.user._id;
    return this.cartService.clearCart(userId);
  }
}
