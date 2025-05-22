import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './blogs.schema';

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
}
