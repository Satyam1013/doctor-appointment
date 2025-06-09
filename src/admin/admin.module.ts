import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [MongooseModule.forFeature([])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService, MongooseModule],
})
export class AdminModule {}
