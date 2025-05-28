// src/mydent-aligners/mydent-aligners.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MydentAlignersService } from './aligners.service';
import { CreateAlignersDto, UpdateAlignersDto } from './aligners.dto';

@Controller('aligners')
export class MydentAlignersController {
  constructor(private readonly service: MydentAlignersService) {}

  @Post()
  create(@Body() dto: CreateAlignersDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAlignersDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
