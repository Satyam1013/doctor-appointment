import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Centers, CentersSchema } from './centers.schema';
import { CentersController } from './centers.controller';
import { CentersService } from './centers.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Centers.name, schema: CentersSchema }]),
  ],
  controllers: [CentersController],
  providers: [CentersService],
})
export class CentersModule {}
