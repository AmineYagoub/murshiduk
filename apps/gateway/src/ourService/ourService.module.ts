import { Module } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';

import { OurServiceController } from './ourService.controller';
import { OurServicesService } from './ourService.service';

@Module({
  imports: [],
  controllers: [OurServiceController],
  providers: [OurServicesService, PrismaService],
})
export class OurServiceModule {}
