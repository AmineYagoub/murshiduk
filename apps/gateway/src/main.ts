import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { PrismaService } from './app/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const port = 3000;
  await app.listen(port, '0.0.0.0');
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
