import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Carousel, CarouselDocument } from '../carousel/carousel.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { deleteFromCloudinary } from 'src/utils/cloudinary';

@Injectable()
export class CarouselService {
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

  async deleteCarousel(id: string) {
    const result = await this.carouselModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Carousel not found');
    }

    await deleteFromCloudinary(result.imageUrl);

    return { message: 'Carousel deleted successfully' };
  }

  async addMultipleCarouselImages(type: 'top' | 'bottom', imageUrls: string[]) {
    const documents = imageUrls.map((url) => ({ type, imageUrl: url }));
    return await this.carouselModel.insertMany(documents);
  }
}
