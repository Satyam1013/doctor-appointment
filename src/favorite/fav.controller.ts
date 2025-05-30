import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FavService } from './fav.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';
import { AddFavoriteDto } from './fav.dto';

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
  add(@Req() req: AuthenticatedRequest, @Body() body: AddFavoriteDto) {
    return this.favService.addToFavorite(req.user._id, body.productId);
  }

  @Get()
  get(@Req() req: AuthenticatedRequest) {
    const userId = req.user._id;
    return this.favService.getFavorite(userId);
  }

  @Delete(':productId')
  remove(
    @Param('productId') productId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user._id;
    return this.favService.removeFromFavorite(productId, userId); // still called "productId"
  }

  @Delete('clear')
  clear(@Req() req: AuthenticatedRequest) {
    const userId = req.user._id;
    return this.favService.clearFavorite(userId);
  }
}
