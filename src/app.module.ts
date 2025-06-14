import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './product/product.module';
import { AdminModule } from './admin/admin.module';
import { CentersModule } from './centers/centers.module';
import { BlogsModule } from './transformation/transformation.module';
import { FavModule } from './favorite/fav.module';
import { MydentAlignersModule } from './aligners/aligners.module';
import { PaymentsModule } from './payment/payment.module';
import { ContactUsModule } from './contacts/contacts.module';
import { CarouselModule } from './carousel/carousel.module';
import { DoctorModule } from './doctor/doc.module';
import { ExpertModule } from './experts/experts.module';
import { MeetModule } from './meet/meet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ✅ makes config accessible app-wide
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    AuthModule,
    UserModule,
    ProductsModule,
    CarouselModule,
    CartModule,
    DoctorModule,
    AdminModule,
    CentersModule,
    BlogsModule,
    FavModule,
    MydentAlignersModule,
    PaymentsModule,
    ContactUsModule,
    ExpertModule,
    MeetModule,
  ],
})
export class AppModule {}
