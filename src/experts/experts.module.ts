import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Expert, ExpertSchema } from './experts.schema';
import { ExpertService } from './experts.service';
import { ExpertsController } from './experts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Expert.name, schema: ExpertSchema }]),
  ],
  providers: [ExpertService],
  controllers: [ExpertsController],
  exports: [ExpertService],
})
export class ExpertModule {}
