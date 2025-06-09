import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactUs, ContactUsSchema } from './contacts.schema';
import { ContactUsController } from './contacts.controller';
import { ContactUsService } from './contacts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContactUs.name, schema: ContactUsSchema },
    ]),
  ],
  controllers: [ContactUsController],
  providers: [ContactUsService],
})
export class ContactUsModule {}
