import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
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
