import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoinsService } from './coins.service';
import { CoinsController } from './coins.controller';
import { Coins, CoinsSchema } from './coins.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coins.name, schema: CoinsSchema }]),
  ],
  controllers: [CoinsController],
  providers: [CoinsService],
  exports: [CoinsService],
})
export class CoinsModule {}
