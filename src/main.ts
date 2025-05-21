import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ origin: '*', credentials: true });

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // So URL can be accessed via /uploads/carousel/filename.jpg
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
