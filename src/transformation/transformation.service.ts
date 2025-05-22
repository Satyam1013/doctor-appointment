import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './transformation.schema';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async createBlog(data: {
    title: string;
    imageUrl: string;
    description: string;
  }) {
    const blog = new this.blogModel(data);
    return blog.save();
  }

  async getAllBlogs() {
    return this.blogModel.find().sort({ createdAt: -1 });
  }

  async deleteBlog(id: string): Promise<{ deleted: boolean }> {
    const result = await this.blogModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return { deleted: true };
  }
}
