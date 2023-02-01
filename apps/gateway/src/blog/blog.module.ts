import { Module } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';

import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  imports: [],
  controllers: [BlogController],
  providers: [BlogService, PrismaService],
})
export class BlogModule {}
