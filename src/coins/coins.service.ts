import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coins, CoinsDocument } from './coins.schema';
import { CreateCoinsDto, UpdateCoinsDto } from './coins.dto';

@Injectable()
export class CoinsService {
  constructor(
    @InjectModel(Coins.name) private coinsModel: Model<CoinsDocument>,
  ) {}

  async create(createCoinsDto: CreateCoinsDto): Promise<Coins> {
    return this.coinsModel.create(createCoinsDto);
  }

  async findAll(): Promise<Coins[]> {
    return this.coinsModel.find().exec();
  }

  async findOne(userId: string) {
    try {
      const coin = await this.coinsModel.findOne({ userId });
      if (!coin) throw new NotFoundException('Coins not found');
      return coin;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async update(id: string, updateCoinsDto: UpdateCoinsDto): Promise<Coins> {
    const updated = await this.coinsModel.findByIdAndUpdate(
      id,
      updateCoinsDto,
      {
        new: true,
      },
    );
    if (!updated) throw new NotFoundException('Coins not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.coinsModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Coins not found');
  }
}
