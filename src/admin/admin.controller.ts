import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('carousels')
  getCarousels() {
    return this.adminService.getCarousels();
  }

  @Post('carousels')
  addCarouselImage(@Body() body: { type: 'top' | 'bottom'; imageUrl: string }) {
    return this.adminService.addCarouselImage(body.type, body.imageUrl);
  }

  @Delete('carousels/:id')
  deleteCarouselImage(@Param('id') id: string) {
    return this.adminService.deleteCarouselImage(id);
  }
}
