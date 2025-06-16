import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Transformation, TransformationSchema } from './transformation.schema';
import { TransformationService } from './transformation.service';
import { TransformationController } from './transformation.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transformation.name, schema: TransformationSchema },
    ]),
  ],
  controllers: [TransformationController],
  providers: [TransformationService],
})
export class TransformationModule {}
