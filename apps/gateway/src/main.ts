import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { PrismaService } from './app/prisma.service';
import { appConfig, AppConfigType } from '@travel/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({})
  );
  const config = app.get<AppConfigType>(appConfig.KEY);
  app.enableCors({
    origin: 'https://travel-ui.enjoystickk.com',
    credentials: true,
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Accept',
      'Content-Type',
      'Authorization',
    ],
  });
  await app.listen(config.port, '0.0.0.0');
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  Logger.log(`🚀 Application is running on: ${config.url}`);
}

bootstrap();
