import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CreateCoinsDto, UpdateCoinsDto } from './coins.dto';

@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @Post()
  create(@Body() createCoinsDto: CreateCoinsDto) {
    return this.coinsService.create(createCoinsDto);
  }

  @Get()
  findAll() {
    return this.coinsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coinsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoinsDto: UpdateCoinsDto) {
    return this.coinsService.update(id, updateCoinsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coinsService.remove(id);
  }
}
