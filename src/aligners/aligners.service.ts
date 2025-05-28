import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Aligner, AlignerDocument } from './aligners.schema';
import { CreateAlignersDto, UpdateAlignersDto } from './aligners.dto';

@Injectable()
export class MydentAlignersService {
  constructor(
    @InjectModel(Aligner.name) private alignerModel: Model<AlignerDocument>,
  ) {}

  async create(createAlignersDto: CreateAlignersDto) {
    return this.alignerModel.create(createAlignersDto);
  }

  async findAll() {
    return this.alignerModel.find().exec();
  }

  async findOne(id: string) {
    const aligner = await this.alignerModel.findById(id).exec();
    if (!aligner) throw new NotFoundException('Aligner not found');
    return aligner;
  }

  async update(id: string, updateAlignersDto: UpdateAlignersDto) {
    const updated = await this.alignerModel
      .findByIdAndUpdate(id, updateAlignersDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Aligner not found');
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.alignerModel.findByIdAndDelete(id);
  }
}
