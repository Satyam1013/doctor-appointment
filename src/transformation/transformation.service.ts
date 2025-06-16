import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transformation } from './transformation.schema';
import { deleteFromCloudinary } from 'src/utils/cloudinary';

@Injectable()
export class TransformationService {
  constructor(
    @InjectModel(Transformation.name)
    private transformationModel: Model<Transformation>,
  ) {}

  async createTransformation(data: {
    title: string;
    imageUrl: string;
    description: string;
  }) {
    const blog = new this.transformationModel(data);
    return blog.save();
  }

  async getAllTransformations() {
    return this.transformationModel.find().sort({ createdAt: -1 });
  }

  async deleteTransformation(id: string): Promise<{ deleted: boolean }> {
    const result = await this.transformationModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Transformation with ID ${id} not found`);
    }

    await deleteFromCloudinary(result.imageUrl);

    return { deleted: true };
  }

  async updateTransformation(
    id: string,
    data: { title?: string; description?: string; imageUrl?: string },
  ) {
    const blog = await this.transformationModel.findById(id);
    if (!blog) {
      throw new NotFoundException(`Transformation with ID ${id} not found`);
    }

    if (data.imageUrl && blog.imageUrl !== data.imageUrl) {
      await deleteFromCloudinary(blog.imageUrl); // remove old image
      blog.imageUrl = data.imageUrl;
    }

    if (data.title) blog.title = data.title;
    if (data.description) blog.description = data.description;

    return blog.save();
  }
}
