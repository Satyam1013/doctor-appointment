import { Controller, Get, Post, Body } from '@nestjs/common';
import { CentersService } from './centers.service';

@Controller('admin/centers')
export class CentersController {
  constructor(private readonly centersService: CentersService) {}

  @Post()
  async addCenters(
    @Body() body: { centers: { name: string; imageUrl: string }[] },
  ) {
    return this.centersService.addCenters(body.centers);
  }

  @Get()
  async getCenters() {
    return this.centersService.getCenters();
  }
}
