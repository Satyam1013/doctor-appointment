import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactUs, ContactUsDocument } from './contacts.schema';
import { CreateContactUsDto } from './contacts.dto';

@Injectable()
export class ContactUsService {
  constructor(
    @InjectModel(ContactUs.name)
    private readonly contactUsModel: Model<ContactUsDocument>,
  ) {}

  async create(createContactUsDto: CreateContactUsDto) {
    return this.contactUsModel.create(createContactUsDto);
  }

  async findAll() {
    return this.contactUsModel.find().exec();
  }

  async findOne(id: string) {
    const entry = await this.contactUsModel.findById(id).exec();
    if (!entry) throw new NotFoundException('Contact entry not found');
    return entry;
  }

  async delete(id: string): Promise<void> {
    const result = await this.contactUsModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Contact entry not found');
  }
}
