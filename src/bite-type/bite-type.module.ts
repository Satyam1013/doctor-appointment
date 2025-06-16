import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BiteType, BiteTypeSchema } from './bite-type.schema';
import { BiteTypeController } from './bite-type.controller';
import { BiteTypeService } from './bite-type.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BiteType.name, schema: BiteTypeSchema },
    ]),
  ],
  controllers: [BiteTypeController],
  providers: [BiteTypeService],
  exports: [BiteTypeService, MongooseModule],
})
export class BiteTypeModule {}
