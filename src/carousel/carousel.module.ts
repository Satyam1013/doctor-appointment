import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Carousel, CarouselSchema } from 'src/carousel/carousel.schema';
import { CarouselService } from './carousel.service';
import { CarouselController } from './carousel.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Carousel.name, schema: CarouselSchema },
    ]),
  ],
  controllers: [CarouselController],
  providers: [CarouselService],
  exports: [CarouselService, MongooseModule],
})
export class AdminModule {}
