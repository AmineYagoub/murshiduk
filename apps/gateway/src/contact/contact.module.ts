import { Module } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';

import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  imports: [],
  controllers: [ContactController],
  providers: [ContactService, PrismaService],
})
export class ContactModule {}
