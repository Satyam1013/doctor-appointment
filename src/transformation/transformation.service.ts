import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './transformation.schema';
import { deleteFromCloudinary } from 'src/utils/cloudinary';

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

    await deleteFromCloudinary(result.imageUrl);

    return { deleted: true };
  }

  async updateBlog(
    id: string,
    data: { title?: string; description?: string; imageUrl?: string },
  ) {
    const blog = await this.blogModel.findById(id);
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
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
