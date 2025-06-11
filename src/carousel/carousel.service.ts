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
    const [top, bottom, mydent, shopTop, shopMiddle, shopBottom] =
      await Promise.all([
        this.carouselModel.find({ type: 'top' }).exec(),
        this.carouselModel.find({ type: 'bottom' }).exec(),
        this.carouselModel.find({ type: 'mydent' }).exec(),
        this.carouselModel.find({ type: 'shop-top' }).exec(),
        this.carouselModel.find({ type: 'shop-middle' }).exec(),
        this.carouselModel.find({ type: 'shop-bottom' }).exec(),
      ]);

    return {
      home: {
        topCarousel: top,
        bottomCarousel: bottom,
        mydentCarousel: mydent,
      },
      shop: {
        topCarousel: shopTop,
        middleCarousel: shopMiddle,
        bottomCarousel: shopBottom,
      },
    };
  }

  async deleteCarousel(id: string) {
    const result = await this.carouselModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Carousel not found');
    }

    await deleteFromCloudinary(result.imageUrl);

    return { message: 'Carousel deleted successfully' };
  }

  async addMultipleCarouselImages(
    type:
      | 'top'
      | 'bottom'
      | 'mydent'
      | 'shop-top'
      | 'shop-middle'
      | 'shop-bottom',
    imageUrls: string[],
  ) {
    const documents = imageUrls.map((url) => ({ type, imageUrl: url }));
    return await this.carouselModel.insertMany(documents);
  }
}
