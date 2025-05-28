import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MydentAlignersController } from './aligners.controller';
import { MydentAlignersService } from './aligners.service';
import { Aligner, AlignerSchema } from './aligners.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Aligner.name, schema: AlignerSchema }]),
  ],
  controllers: [MydentAlignersController],
  providers: [MydentAlignersService],
})
export class MydentAlignersModule {}
