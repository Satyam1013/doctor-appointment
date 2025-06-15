import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from './rep.schema';
import { ReportService } from './rep.service';
import { ReportController } from './reps.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }]),
  ],
  providers: [ReportService],
  controllers: [ReportController],
  exports: [ReportService, MongooseModule],
})
export class ReportModule {}
