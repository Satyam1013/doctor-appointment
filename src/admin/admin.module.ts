import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin.service';

@Module({
  imports: [MongooseModule.forFeature()],
  providers: [AdminService],
  exports: [AdminService, MongooseModule],
})
export class AdminModule {}
