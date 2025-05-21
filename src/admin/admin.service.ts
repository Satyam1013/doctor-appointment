import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Carousel, CarouselDocument } from '../carousel/carousel.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Carousel.name)
    private readonly carouselModel: Model<CarouselDocument>,
  ) {}

  async getCarousels() {
    const top = await this.carouselModel.find({ type: 'top' }).exec();
    const bottom = await this.carouselModel.find({ type: 'bottom' }).exec();

    return {
      topCarousel: top,
      bottomCarousel: bottom,
    };
  }

  async addCarouselImage(type: 'top' | 'bottom', imageUrl: string) {
    const image = new this.carouselModel({ type, imageUrl });
    return await image.save();
  }

  async deleteCarouselImage(id: string) {
    return await this.carouselModel.findByIdAndDelete(id);
  }
}
