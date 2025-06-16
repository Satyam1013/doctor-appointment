// blog.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './blogs.schema';
import { Model } from 'mongoose';
import { CreateBlogDto, EditBlogDto } from './blogs.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async createBlog(data: CreateBlogDto) {
    return await this.blogModel.create(data);
  }

  async getAllBlogs() {
    return await this.blogModel.find().sort({ createdAt: -1 });
  }

  async getBlogById(id: string) {
    return await this.blogModel.findById(id);
  }

  async editBlog(id: string, data: EditBlogDto) {
    return await this.blogModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteBlog(id: string) {
    return await this.blogModel.findByIdAndDelete(id);
  }
}
