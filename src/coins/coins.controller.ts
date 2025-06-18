import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CreateCoinsDto, UpdateCoinsDto } from './coins.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequest } from 'src/common/auth-req';

@Controller('coins')
@UseGuards(AuthGuard('jwt'))
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

  @Get('user')
  findOne(@Req() req: AuthRequest) {
    return this.coinsService.findOne(req.user._id);
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
