import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Meet, MeetSchema } from './meet.schema';
import { MeetService } from './meet.service';
import { MeetController } from './meet.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Meet.name, schema: MeetSchema }]),
  ],
  controllers: [MeetController],
  providers: [MeetService],
  exports: [MeetService],
})
export class MeetModule {}
