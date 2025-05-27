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
import { FavService } from './fav.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

export interface AuthenticatedRequest extends ExpressRequest {
  user: {
    _id: string;
  };
}

@Controller('favorite')
@UseGuards(JwtAuthGuard)
export class FavController {
  constructor(private readonly favService: FavService) {}

  @Post('add')
  add(
    @Req() req: AuthenticatedRequest,
    @Body() body: { productId: string; quantity: number },
  ) {
    const userId = req.user._id;
    return this.favService.addToFavorite(userId, body.productId, body.quantity);
  }

  @Get()
  get(@Req() req: AuthenticatedRequest) {
    const userId = req.user._id;
    return this.favService.getFavorite(userId);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() body: { quantity: number }) {
    return this.favService.updateQuantity(id, body.quantity);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favService.removeFromFavorite(id);
  }

  @Delete('clear')
  clear(@Req() req: AuthenticatedRequest) {
    const userId = req.user._id;
    return this.favService.clearFavorite(userId);
  }
}
